// Firebase path that Sunday School registrations are saved under, split by
// school year (e.g. sundaySchoolRegistrations/2026-2027/<push id>)
export const SUNDAY_SCHOOL_REF_NAME = 'sundaySchoolRegistrations';

// Month the new school year starts in (0-based, so 7 is August)
const SCHOOL_YEAR_START_MONTH = 7;

export const BLANK_REGISTRATION = {
  agreementCheckList: new Set(),
  allergies: '',
  childName: {first: '', last: ''},
  parentName: {first: '', last: ''},
  parentPhone: '',
  childDateOfBirth: '',
  childEmail: '',
  parentEmail: '',
  childPhone: '',
  emergencyContactName: {first: '', last: ''},
  emergencyContactRelationship: '',
  emergencyPhone: '',
  address: {
    streetLine1: '',
    streetLine2: '',
    city: '',
    state: '',
    zip: '',
  },
  medicalFacility: '',
  physician: {first: '', last: ''},
  physicianPhone: '',
  allergyDetails: '',
  additionalInformation: '',
  signedDate: '',
  subscribe: false,
};

// Returns the school year a date falls in, e.g. "2026-2027" for both
// September 2026 and March 2027
export function getSchoolYear(date) {
  const year = date.getFullYear();
  const startYear =
    date.getMonth() >= SCHOOL_YEAR_START_MONTH ? year : year - 1;
  return `${startYear}-${startYear + 1}`;
}

// Converts form state into the record saved to Firebase. legacySources lists
// the old CC/VBS records the form was pre-filled from, if any.
export function buildRegistrationRecord(registrationInfo, legacySources, now) {
  const record = {
    ...registrationInfo,
    agreementCheckList: [...registrationInfo.agreementCheckList],
    registerTime: now.toISOString(),
    source: legacySources?.length ? 'legacy' : 'new',
  };
  if (legacySources?.length) {
    record.legacySources = legacySources;
  }
  return record;
}
