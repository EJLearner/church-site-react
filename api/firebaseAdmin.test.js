import {createRequire} from 'module';

import {beforeEach, describe, expect, it, vi} from 'vitest';

const nodeRequire = createRequire(import.meta.url);

// firebaseAdmin.js loads firebase-admin with a native require, so swap in a
// fake module through the require cache instead of vi.mock
const groupMembers = {};
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
  database: () => ({
    ref: (path) => ({
      get: async () => {
        if (path.includes('broken')) {
          throw new Error('database unavailable');
        }
        const [, group, uid] = path.split('/');
        return {val: () => groupMembers[group]?.[uid] ?? null};
      },
    }),
  }),
};
nodeRequire.cache[nodeRequire.resolve('firebase-admin')] = {exports: fakeAdmin};

const {requireAuth, requireGroup} = nodeRequire('./firebaseAdmin');

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

  it('sets req.user and continues for a valid token', async () => {
    const request = {headers: {authorization: 'Bearer some-user'}};
    const next = vi.fn();

    await requireAuth(request, createResponse(), next);

    expect(request.user).toEqual({uid: 'some-user'});
    expect(next).toHaveBeenCalled();
  });
});

describe('requireGroup', () => {
  beforeEach(() => {
    Object.keys(groupMembers).forEach((group) => delete groupMembers[group]);
    groupMembers.admins = {'admin-user': true};
    groupMembers.contentAdmin = {'content-user': true};
    groupMembers.ccRegAccess = {'cc-user': true};
  });

  it('returns 403 for a signed-in user in no group', async () => {
    const response = createResponse();
    const next = vi.fn();

    await requireGroup('admins')({user: {uid: 'stranger'}}, response, next);

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('allows a member of the group', async () => {
    const next = vi.fn();

    await requireGroup('admins')(
      {user: {uid: 'admin-user'}},
      createResponse(),
      next,
    );

    expect(next).toHaveBeenCalled();
  });

  it('allows a member of any listed group', async () => {
    const next = vi.fn();

    await requireGroup('admins', 'contentAdmin')(
      {user: {uid: 'content-user'}},
      createResponse(),
      next,
    );

    expect(next).toHaveBeenCalled();
  });

  it('returns 403 for a member of an unlisted group', async () => {
    const response = createResponse();
    const next = vi.fn();

    await requireGroup('admins', 'contentAdmin')(
      {user: {uid: 'cc-user'}},
      response,
      next,
    );

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when the membership value is not true', async () => {
    groupMembers.admins.disabled = false;
    const response = createResponse();
    const next = vi.fn();

    await requireGroup('admins')({user: {uid: 'disabled'}}, response, next);

    expect(response.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 500 when the group lookup fails', async () => {
    const response = createResponse();
    const next = vi.fn();

    await requireGroup('broken')({user: {uid: 'admin-user'}}, response, next);

    expect(response.statusCode).toBe(500);
    expect(next).not.toHaveBeenCalled();
  });
});
