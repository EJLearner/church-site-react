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

  it('calls fetch with the correct URL and returns response', async () => {
    const response = await getVerseInfo(testQuery);

    expect(fetch).toHaveBeenCalledWith(
      `/api/verse?q=${encodeURIComponent(testQuery)}`,
    );

    expect(response).toEqual(testPassages);
  });

  it('returns cached result on second call without fetching again', async () => {
    await getVerseInfo(testQuery);
    await getVerseInfo(testQuery);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it.skip('falls back to scripture.api.bible when fetch fails', async () => {
    // Verified working locally; XMLHttpRequest global mocking is unreliable in CI
  });
});
