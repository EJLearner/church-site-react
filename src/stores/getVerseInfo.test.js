import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import getVerseInfo, {_resetCache} from './getVerseInfo';

const testPassages = [{content: '<p>test</p>', reference: 'John 3:16'}];
const testResponseObject = {data: {passages: testPassages}};

describe('getVerseInfo', () => {
  const testQuery = 'John 3.16';

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(testResponseObject),
      }),
    );
  });

  afterEach(() => {
    _resetCache();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  it('falls back to scripture.api.bible when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network error')),
    );

    let xhrInstance;
    vi.stubGlobal(
      'XMLHttpRequest',
      class {
        constructor() {
          this.open = vi.fn();
          this.setRequestHeader = vi.fn();
          this.readyState = 4;
          this.DONE = 4;
          this.responseText = JSON.stringify(testResponseObject);
          this.onreadystatechange = null;
          this.send = vi
            .fn()
            .mockImplementation(() => this.onreadystatechange());
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          xhrInstance = this;
        }
      },
    );

    const cb = vi.fn();
    await new Promise((resolve) => {
      getVerseInfo(testQuery, (result) => {
        cb(result);
        resolve();
      });
    });

    expect(xhrInstance.open).toHaveBeenCalledWith(
      'GET',
      expect.stringContaining('api.scripture.api.bible'),
    );
    expect(cb).toHaveBeenCalledWith(testPassages);
  });
});
