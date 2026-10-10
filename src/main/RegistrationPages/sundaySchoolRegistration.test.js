import {describe, expect, it} from 'vitest';

import {
  BLANK_REGISTRATION,
  buildRegistrationRecord,
  getSchoolYear,
} from './sundaySchoolRegistration';

describe('getSchoolYear', () => {
  it.each([
    [new Date(2026, 6, 31), '2025-2026'],
    [new Date(2026, 7, 1), '2026-2027'],
    [new Date(2026, 11, 31), '2026-2027'],
    [new Date(2027, 0, 1), '2026-2027'],
    [new Date(2027, 5, 15), '2026-2027'],
  ])('puts %s in %s', (date, schoolYear) => {
    expect(getSchoolYear(date)).toBe(schoolYear);
  });
});

describe('buildRegistrationRecord', () => {
  const now = new Date('2026-09-13T15:00:00.000Z');
  const registrationInfo = {
    ...BLANK_REGISTRATION,
    agreementCheckList: new Set(['parentGuardian', 'emergencyCare']),
    childName: {first: 'Ada', last: 'Lovelace'},
  };

  it('marks a brand new registration', () => {
    const record = buildRegistrationRecord(registrationInfo, undefined, now);

    expect(record).toMatchObject({
      agreementCheckList: ['parentGuardian', 'emergencyCare'],
      childName: {first: 'Ada', last: 'Lovelace'},
      registerTime: '2026-09-13T15:00:00.000Z',
      source: 'new',
    });
    expect(record).not.toHaveProperty('legacySources');
  });

  it('records which past registrations it came from', () => {
    const legacySources = [
      {table: 'ccRegisteredChildren', year: '2019', id: 'abc'},
    ];

    const record = buildRegistrationRecord(
      registrationInfo,
      legacySources,
      now,
    );

    expect(record.source).toBe('legacy');
    expect(record.legacySources).toEqual(legacySources);
  });

  it('does not change the form state', () => {
    buildRegistrationRecord(registrationInfo, undefined, now);

    expect(registrationInfo.agreementCheckList).toBeInstanceOf(Set);
  });
});
