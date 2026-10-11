import {child, ref, set} from 'firebase/database';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import constants from './constants';
import pushToSubscribedList from './pushToSubscribedList';

vi.mock('firebase/database', () => ({
  child: vi.fn((parent, path) => ({path: `${parent.path}/${path}`})),
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn((database, path) => ({path})),
  set: vi.fn(() => Promise.resolve()),
}));

describe('pushToSubscribedList', () => {
  let testEmail;
  let testSource;
  let testName;

  beforeEach(() => {
    vi.clearAllMocks();
    testEmail = 'test@email.com';
    testSource = 'test source';
    testName = 'test name';
  });

  it('uses the subscribed emails ref name', () => {
    pushToSubscribedList(testEmail, testSource, testName);

    expect(ref).toHaveBeenCalledWith(
      expect.anything(),
      constants.SUBSCRIBED_EMAILS_REF_NAME,
    );
  });

  describe('child key', () => {
    it.each([
      ['test@email.com', 'test@email,com'],
      ['test@mail.somewhere.com', 'test@mail,somewhere,com'],
      ['a.person-here@mail.somewhere.com', 'a,person-here@mail,somewhere,com'],
    ])('replaces periods in %s', (email, key) => {
      pushToSubscribedList(email, testSource, testName);

      expect(child).toHaveBeenCalledWith(
        {path: constants.SUBSCRIBED_EMAILS_REF_NAME},
        key,
      );
      expect(set.mock.calls[0][0]).toEqual({
        path: `${constants.SUBSCRIBED_EMAILS_REF_NAME}/${key}`,
      });
    });
  });

  describe('set object', () => {
    let setObject;

    beforeEach(() => {
      pushToSubscribedList(testEmail, testSource, testName);

      [[, setObject]] = set.mock.calls;
    });

    it('uses email from argument', () => {
      expect(setObject.email).toBe(testEmail);
    });

    it('uses current time', () => {
      // dddd-dd-ddTdd:dd:dd.dddZ
      expect(setObject.subscribeTime).toMatch(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
      );
    });

    it('uses subscribeSource', () => {
      expect(setObject.subscribeSource).toBe(testSource);
    });

    it('uses name', () => {
      expect(setObject.name).toBe(testName);
    });
  });

  it('ignores a failed save', async () => {
    set.mockReturnValueOnce(Promise.reject(new Error('exists')));

    expect(() =>
      pushToSubscribedList(testEmail, testSource, testName),
    ).not.toThrow();
  });
});
