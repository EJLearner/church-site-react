import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import getVerseInfo, {_resetCache} from './getVerseInfo';

const testPassages = [{content: '<p>test</p>', reference: 'John 3:16'}];
const testResponseObject = {data: {passages: testPassages}};

describe('getVerseInfo', () => {
  const testQuery = 'John 3.16';

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(testResponseObject),
    });
  });

  afterEach(() => {
    _resetCache();
    vi.restoreAllMocks();
  });

  it('calls fetch with the correct URL', async () => {
    await new Promise((resolve) => getVerseInfo(testQuery, resolve));
    expect(fetch).toHaveBeenCalledWith(
      `/api/verse?q=${encodeURIComponent(testQuery)}`,
    );
  });

  it('calls callback with passages array', async () => {
    const cb = vi.fn();
    await new Promise((resolve) => {
      getVerseInfo(testQuery, (result) => {
        cb(result);
        resolve();
      });
    });
    expect(cb).toHaveBeenCalledWith(testPassages);
  });

  it('returns cached result on second call without fetching again', async () => {
    await new Promise((resolve) => getVerseInfo(testQuery, resolve));
    await new Promise((resolve) => getVerseInfo(testQuery, resolve));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('calls callback with null on fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network error'));
    const cb = vi.fn();
    await new Promise((resolve) => {
      getVerseInfo(testQuery, (result) => {
        cb(result);
        resolve();
      });
    });
    expect(cb).toHaveBeenCalledWith(null);
  });
});
