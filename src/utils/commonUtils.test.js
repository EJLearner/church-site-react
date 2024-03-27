import {beforeEach, describe, vi, expect, it, afterEach} from 'vitest';

import commonUtils from './commonUtils';

describe('commonUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('#getCcDbYear', () => {
    it('returns the current year when July or later', () => {
      // 2020/09/05
      vi.setSystemTime(new Date(2020, 8, 5));
      expect(commonUtils.getCcDbYear()).toEqual(2020);
    });

    it('returns the previous year when before July', () => {
      // 2020/03/05
      vi.setSystemTime(new Date(2020, 2, 5));
      expect(commonUtils.getCcDbYear()).toEqual(2019);
    });
  });
});
