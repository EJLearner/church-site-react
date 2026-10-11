import {createRequire} from 'module';

import {describe, expect, it} from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const {buildLegacyEntries, convertAllergies, splitName} = nodeRequire(
  './legacyRegistrations',
);

const ccRecord = {
  address1: '1 Main St ',
  address2: '',
  childDob: '2015-03-01',
  childName: 'Ada Lovelace',
  city: 'Baltimore',
  knownAllergies: 'Peanuts',
  parentEmail: 'old@example.com',
  parentName: 'Anne Lovelace',
  parentNames: ['Anne Lovelace'],
  parentPhone: '4105550000',
  registerTime: '2018-09-01T00:00:00.000Z',
  state: 'MD',
  subscribe: true,
  zip: '21201',
};

const legacyData = {
  ccRegisteredChildren: {
    2017: {
      0: {
        ccRegisteredId: '0',
        childDob: '2015-03-01',
        childName: 'Ada Lovelace',
        parentNames: ['Anne Lovelace', 'William Lovelace'],
      },
    },
    2018: {cc1: ccRecord},
  },
  vbsRegisteredChildren: {
    2018: {
      vbs1: {
        ...ccRecord,
        childDob: '2016-07-04',
        childName: 'Grace Hopper',
        parentName: 'Mary Hopper',
        parentNames: ['Mary Hopper'],
      },
    },
  },
  vbsRegisteredStudents: {
    2021: {
      student1: {
        address1: '2 New Rd',
        address2: 'Apt 3',
        childDob: '2015-03-01',
        city: 'Towson',
        email: 'new@example.com',
        knownAllergies: 'N/A',
        parentName: 'Anne Lovelace',
        phone: '410-555-1111',
        registerTime: '2021-07-01T00:00:00.000Z',
        state: 'MD',
        studentName: 'Ada Lovelace',
        subscribe: false,
        type: 'CHILD',
        zip: '21204',
      },
      adult1: {studentName: 'Alan Turing', type: 'ADULT'},
    },
  },
};

describe('splitName', () => {
  it('splits first and last name', () => {
    expect(splitName('Ada Lovelace')).toEqual({first: 'Ada', last: 'Lovelace'});
  });

  it('keeps middle names with the first name', () => {
    expect(splitName('Mary Ann  Smith ')).toEqual({
      first: 'Mary Ann',
      last: 'Smith',
    });
  });

  it('keeps a suffix with the last name', () => {
    expect(splitName('John Smith Jr.')).toEqual({
      first: 'John',
      last: 'Smith Jr.',
    });
  });

  it('handles a single name and missing names', () => {
    expect(splitName('Cher')).toEqual({first: 'Cher', last: ''});
    expect(splitName(undefined)).toEqual({first: '', last: ''});
  });
});

describe('convertAllergies', () => {
  it.each(['N/A', 'n/a', 'N\\A', 'NA', 'Na', 'none', 'None '])(
    'treats %j as no allergies',
    (knownAllergies) => {
      expect(convertAllergies(knownAllergies)).toEqual({
        allergies: 'no',
        allergyDetails: '',
      });
    },
  );

  it('treats other text as allergy details', () => {
    expect(convertAllergies(' Peanuts ')).toEqual({
      allergies: 'yes',
      allergyDetails: 'Peanuts',
    });
  });

  it('leaves the answer blank when nothing was given', () => {
    expect(convertAllergies(undefined)).toEqual({
      allergies: '',
      allergyDetails: '',
    });
  });
});

describe('buildLegacyEntries', () => {
  const entries = buildLegacyEntries(legacyData);
  const ada = entries.find((entry) => entry.values.childName.first === 'Ada');

  it('groups registrations for the same child and skips adults', () => {
    expect(entries.map((entry) => entry.values.childName.first)).toEqual([
      'Grace',
      'Ada',
    ]);
  });

  it('lists every source record, oldest first', () => {
    expect(ada.sources).toEqual([
      {table: 'ccRegisteredChildren', year: '2017', id: '0'},
      {table: 'ccRegisteredChildren', year: '2018', id: 'cc1'},
      {table: 'vbsRegisteredStudents', year: '2021', id: 'student1'},
    ]);
    expect(ada.id).toBe('vbsRegisteredStudents/2021/student1');
    expect(ada.lastRegistered).toBe('2021');
  });

  it('uses the newest values, mapping VBS student fields', () => {
    expect(ada.values).toEqual({
      childName: {first: 'Ada', last: 'Lovelace'},
      childDateOfBirth: '2015-03-01',
      parentName: {first: 'Anne', last: 'Lovelace'},
      parentEmail: 'new@example.com',
      parentPhone: '410-555-1111',
      address: {
        streetLine1: '2 New Rd',
        streetLine2: 'Apt 3',
        city: 'Towson',
        state: 'MD',
        zip: '21204',
      },
      allergies: 'no',
      allergyDetails: '',
      subscribe: false,
    });
  });

  it('collects all parent names without repeats', () => {
    expect(ada.parentNames).toEqual(['Anne Lovelace', 'William Lovelace']);
  });

  it('lists a parent once when named in both parent fields', () => {
    const grace = entries.find(
      (entry) => entry.values.childName.first === 'Grace',
    );
    expect(grace.parentNames).toEqual(['Mary Hopper']);
  });

  it('treats spacing, case and apostrophe differences as the same name', () => {
    const [entry] = buildLegacyEntries({
      ccRegisteredChildren: {
        2019: {
          one: {
            childName: 'Kid OBrien',
            parentName: "Sam O'Brien",
            parentNames: ['sam  o\u2019brien', 'Sam O\u2019Brien'],
          },
        },
      },
    });
    expect(entry.parentNames).toEqual(["Sam O'Brien"]);
  });

  it('handles missing tables', () => {
    expect(buildLegacyEntries({})).toEqual([]);
  });
});
