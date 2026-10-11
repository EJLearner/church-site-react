import {EventEmitter} from 'events';
import {createRequire} from 'module';

import {afterAll, beforeEach, describe, expect, it, vi} from 'vitest';

const nodeRequire = createRequire(import.meta.url);

// firebaseAdmin.js loads firebase-admin with a native require, so swap in a
// fake module through the require cache instead of vi.mock
const fakeAdmin = {
  initializeApp: () => {},
  credential: {cert: () => ({})},
  auth: () => ({
    verifyIdToken: async (token) => {
      if (token === 'bad-token') {
        throw new Error('invalid');
      }
      return {uid: token};
    },
  }),
};
nodeRequire.cache[nodeRequire.resolve('firebase-admin')] = {exports: fakeAdmin};

// Fake Realtime Database REST API: group membership by group and uid, plus
// special uids that make the request fail in different ways
const groupMembers = {};
const https = nodeRequire('https');
const httpsGet = vi.spyOn(https, 'get').mockImplementation(fakeHttpsGet);

function fakeHttpsGet(url, options, callback) {
  const request = new EventEmitter();
  request.destroy = (error) => setImmediate(() => request.emit('error', error));

  const {pathname} = new URL(url);
  const [, , group, uid] = pathname.replace('.json', '').split('/');

  setImmediate(() => {
    if (uid === 'slow-user') {
      request.emit('timeout');
      return;
    }
    if (uid === 'offline-user') {
      request.emit('error', new Error('getaddrinfo ENOTFOUND'));
      return;
    }

    const response = new EventEmitter();
    let body = JSON.stringify(groupMembers[group]?.[uid] ?? null);
    response.statusCode = 200;
    if (uid === 'denied-user') {
      response.statusCode = 401;
      body = JSON.stringify({error: 'Permission denied'});
    } else if (uid === 'server-error-user') {
      response.statusCode = 500;
    }

    callback(response);
    response.emit('data', body);
    response.emit('end');
  });
  return request;
}

const {requireAuth, requireGroup} = nodeRequire('./firebaseAdmin');

afterAll(() => {
  httpsGet.mockRestore();
});

const createResponse = () => {
  const response = {statusCode: null, body: null};
  response.status = (code) => {
    response.statusCode = code;
    return response;
  };
  response.json = (body) => {
    response.body = body;
    return response;
  };
  return response;
};

describe('requireAuth', () => {
  it('returns 401 without a bearer token', async () => {
    const response = createResponse();
    const next = vi.fn();

    await requireAuth({headers: {}}, response, next);

    expect(response.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for an invalid token', async () => {
    const response = createResponse();
    const next = vi.fn();

    await requireAuth(
      {headers: {authorization: 'Bearer bad-token'}},
      response,
      next,
    );

    expect(response.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('sets req.user and req.idToken and continues for a valid token', async () => {
    const request = {headers: {authorization: 'Bearer some-user'}};
    const next = vi.fn();

    await requireAuth(request, createResponse(), next);

    expect(request.user).toEqual({uid: 'some-user'});
    expect(request.idToken).toBe('some-user');
    expect(next).toHaveBeenCalled();
  });
});

describe('requireGroup', () => {
  const runGroupCheck = async (groups, uid) => {
    const response = createResponse();
    const next = vi.fn();
    await requireGroup(...groups)(
      {user: {uid}, idToken: `token-for-${uid}`},
      response,
      next,
    );
    return {next, response};
  };

  beforeEach(() => {
    httpsGet.mockClear();
    Object.keys(groupMembers).forEach((group) => delete groupMembers[group]);
    groupMembers.admins = {'admin-user': true, disabled: false};
    groupMembers.contentAdmin = {'content-user': true};
    groupMembers.ccRegAccess = {'cc-user': true};
  });

  it("reads the group from the database REST API with the user's token", async () => {
    await runGroupCheck(['admins'], 'admin-user');

    const [[url, options]] = httpsGet.mock.calls;
    expect(url).toBe(
      'https://ct-data-773e4.firebaseio.com/user_groups/admins/admin-user.json?auth=token-for-admin-user',
    );
    expect(options.timeout).toBeGreaterThan(0);
  });

  it('returns 403 for a signed-in user in no group', async () => {
    const {next, response} = await runGroupCheck(['admins'], 'stranger');

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('allows a member of the group', async () => {
    const {next} = await runGroupCheck(['admins'], 'admin-user');

    expect(next).toHaveBeenCalled();
  });

  it('allows a member of any listed group', async () => {
    const {next} = await runGroupCheck(
      ['admins', 'contentAdmin'],
      'content-user',
    );

    expect(next).toHaveBeenCalled();
  });

  it('returns 403 for a member of an unlisted group', async () => {
    const {next, response} = await runGroupCheck(
      ['admins', 'contentAdmin'],
      'cc-user',
    );

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when the membership value is not true', async () => {
    const {next, response} = await runGroupCheck(['admins'], 'disabled');

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when the database rules deny the read', async () => {
    const {next, response} = await runGroupCheck(['admins'], 'denied-user');

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it.each(['server-error-user', 'offline-user', 'slow-user'])(
    'returns 500 when the lookup fails (%s)',
    async (uid) => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const {next, response} = await runGroupCheck(['admins'], uid);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({error: 'Unable to verify permissions'});
      expect(next).not.toHaveBeenCalled();
    },
  );
});
