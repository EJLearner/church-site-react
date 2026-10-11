import {describe, expect, it} from 'vitest';

import {
  BLANK_REGISTRATION,
  buildRegistrationRecord,
  cleanRegistration,
  getDateOfBirthRange,
  getSchoolYear,
  validateRegistration,
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

describe('validateRegistration', () => {
  const today = new Date(2026, 9, 10);
  const validRegistration = {
    ...BLANK_REGISTRATION,
    allergies: 'no',
    childDateOfBirth: '2015-03-01',
    childName: {first: 'Ada', last: 'Lovelace'},
    parentName: {first: 'Anne', last: 'Lovelace'},
    parentPhone: '410-555-0000',
  };
  const validate = (changes, badDateIds) =>
    validateRegistration({...validRegistration, ...changes}, today, badDateIds);

  it('accepts a complete registration', () => {
    expect(validate({})).toEqual({});
  });

  it('requires the child and parent names, date of birth, parent phone and allergies', () => {
    expect(
      Object.keys(validateRegistration(BLANK_REGISTRATION, today)),
    ).toEqual([
      'childName-first',
      'childName-last',
      'childDateOfBirth',
      'parentName-first',
      'parentName-last',
      'parentPhone',
      'allergies-yes',
    ]);
  });

  it('treats names of only spaces as blank', () => {
    expect(validate({childName: {first: '  ', last: 'Lovelace'}})).toEqual({
      'childName-first': "Child's first name is required",
    });
  });

  it.each([
    ['2006-10-10', undefined],
    ['2026-10-10', undefined],
    ['2006-10-09', 'Date of birth must be for a child'],
    ['2026-10-11', 'Date of birth must be for a child'],
    ['2015-02-30', "Child's date of birth is not a valid date"],
  ])('checks date of birth %s', (childDateOfBirth, message) => {
    expect(validate({childDateOfBirth}).childDateOfBirth).toBe(message);
  });

  it('reports a partly typed date of birth', () => {
    expect(
      validate({childDateOfBirth: ''}, new Set(['childDateOfBirth']))
        .childDateOfBirth,
    ).toBe("Child's date of birth is not a valid date");
  });

  it.each([
    ['(410) 555-0000', undefined],
    ['410555000', 'must have 10 digits'],
    ['', undefined],
  ])('checks optional phone %s', (childPhone, message) => {
    const error = validate({childPhone}).childPhone;
    if (message) {
      expect(error).toContain(message);
    } else {
      expect(error).toBeUndefined();
    }
  });

  it.each([
    ['21201', undefined],
    ['21201-1234', undefined],
    ['212011234', undefined],
    ['2120', 'Zip code must have 5 or 9 digits'],
    ['212011', 'Zip code must have 5 or 9 digits'],
  ])('checks zip %s', (zip, message) => {
    expect(
      validate({address: {...BLANK_REGISTRATION.address, zip}})['address-zip'],
    ).toBe(message);
  });

  it('checks email addresses', () => {
    expect(validate({parentEmail: 'anne@example.com'})).toEqual({});
    expect(validate({parentEmail: 'anne@'}).parentEmail).toBe(
      'Parent/guardian email must be a valid email address',
    );
  });

  it('requires allergy details only when the child has allergies', () => {
    expect(validate({allergies: 'yes'}).allergyDetails).toBe(
      'Allergy details are required',
    );
    expect(validate({allergies: 'yes', allergyDetails: 'Peanuts'})).toEqual({});
  });
});

describe('getDateOfBirthRange', () => {
  it('allows today back to 20 years ago', () => {
    expect(getDateOfBirthRange(new Date(2026, 0, 5))).toEqual({
      min: '2006-01-05',
      max: '2026-01-05',
    });
  });
});

describe('cleanRegistration', () => {
  it('trims text, strips phone formatting and formats 9-digit zips', () => {
    const cleaned = cleanRegistration({
      ...BLANK_REGISTRATION,
      address: {
        ...BLANK_REGISTRATION.address,
        city: ' Baltimore ',
        zip: '212011234',
      },
      childName: {first: ' Ada ', last: 'Lovelace '},
      emergencyPhone: '(410) 555-1111',
      parentPhone: ' 410.555.0000',
    });

    expect(cleaned).toMatchObject({
      address: {city: 'Baltimore', zip: '21201-1234'},
      childName: {first: 'Ada', last: 'Lovelace'},
      childPhone: '',
      emergencyPhone: '4105551111',
      parentPhone: '4105550000',
    });
    expect(cleaned.agreementCheckList).toBeInstanceOf(Set);
  });

  it('drops allergy details when the child has no allergies', () => {
    expect(
      cleanRegistration({
        ...BLANK_REGISTRATION,
        allergies: 'no',
        allergyDetails: 'Peanuts',
      }).allergyDetails,
    ).toBe('');
  });
});
