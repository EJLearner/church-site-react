import {describe, expect, it} from 'vitest';

import {getSundayOfYearIndex} from './dateTimeUtils';

describe('dateTimeUtils', () => {
  it('gives the correct sunday index', () => {
    expect(getSundayOfYearIndex('2024-01-14')).toBe(1);
    expect(getSundayOfYearIndex('2024-03-31')).toBe(12);
    expect(getSundayOfYearIndex('2024-12-29')).toBe(51);
    expect(getSundayOfYearIndex('2025-01-05')).toBe(0);
    expect(getSundayOfYearIndex('2025-12-28')).toBe(51);
    expect(getSundayOfYearIndex('2028-01-02')).toBe(0);
    expect(getSundayOfYearIndex('2028-12-31')).toBe(52);
  });
});
