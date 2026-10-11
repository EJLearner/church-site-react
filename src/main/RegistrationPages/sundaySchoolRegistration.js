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
  allergyDetails: '',
  additionalInformation: '',
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

// Oldest a child can be to register, in years
const MAX_CHILD_AGE = 20;

const PHONE_FIELDS = [
  ['childPhone', "Child's phone number"],
  ['parentPhone', 'Parent/guardian phone number'],
  ['emergencyPhone', 'Emergency contact phone number'],
];

const EMAIL_FIELDS = [
  ['childEmail', "Child's email"],
  ['parentEmail', 'Parent/guardian email'],
];

const pad = (number) => String(number).padStart(2, '0');

// Formats a date as yyyy-mm-dd in local time, the format date inputs use
const toDateInputValue = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const isBlank = (value) => !value?.trim();

const digitsOnly = (value) => value.replace(/\D/g, '');

// True for a real yyyy-mm-dd date (rejects things like 2026-02-30)
function isValidDateInputValue(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Earliest and latest allowed dates of birth, as yyyy-mm-dd strings
export function getDateOfBirthRange(today) {
  const earliest = new Date(today);
  earliest.setFullYear(today.getFullYear() - MAX_CHILD_AGE);
  return {min: toDateInputValue(earliest), max: toDateInputValue(today)};
}

// Returns {inputId: message} for every problem with the form, in the order
// the inputs appear. badDateIds lists date inputs the browser reports as only
// partly filled in, since their value is '' in that case.
export function validateRegistration(registrationInfo, today, badDateIds) {
  const errors = {};
  const requireName = (id, label) => {
    const name = registrationInfo[id];
    if (isBlank(name?.first)) {
      errors[`${id}-first`] = `${label} first name is required`;
    }
    if (isBlank(name?.last)) {
      errors[`${id}-last`] = `${label} last name is required`;
    }
  };
  const checkEmail = ([id, label]) => {
    const email = registrationInfo[id]?.trim();
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors[id] = `${label} must be a valid email address`;
    }
  };
  const checkPhone = ([id, label], {required} = {}) => {
    const phone = registrationInfo[id] ?? '';
    if (required && isBlank(phone)) {
      errors[id] = `${label} is required`;
    } else if (phone.trim() && digitsOnly(phone).length !== 10) {
      errors[id] = `${label} must have 10 digits`;
    }
  };
  const [childEmailField, parentEmailField] = EMAIL_FIELDS;
  const [childPhoneField, parentPhoneField, emergencyPhoneField] = PHONE_FIELDS;

  requireName('childName', "Child's");

  const dateOfBirth = registrationInfo.childDateOfBirth ?? '';
  const {min, max} = getDateOfBirthRange(today);
  if (badDateIds?.has('childDateOfBirth')) {
    errors.childDateOfBirth = "Child's date of birth is not a valid date";
  } else if (isBlank(dateOfBirth)) {
    errors.childDateOfBirth = "Child's date of birth is required";
  } else if (!isValidDateInputValue(dateOfBirth)) {
    errors.childDateOfBirth = "Child's date of birth is not a valid date";
  } else if (dateOfBirth < min || dateOfBirth > max) {
    errors.childDateOfBirth = 'Date of birth must be for a child';
  }

  checkEmail(childEmailField);
  checkPhone(childPhoneField);

  const zip = registrationInfo.address?.zip ?? '';
  if (zip.trim() && ![5, 9].includes(digitsOnly(zip).length)) {
    errors['address-zip'] = 'Zip code must have 5 or 9 digits';
  }

  requireName('parentName', 'Parent/guardian');
  checkEmail(parentEmailField);
  checkPhone(parentPhoneField, {required: true});
  checkPhone(emergencyPhoneField);

  if (!registrationInfo.allergies) {
    errors['allergies-yes'] = 'Please say whether your child has allergies';
  } else if (
    registrationInfo.allergies === 'yes' &&
    isBlank(registrationInfo.allergyDetails)
  ) {
    errors.allergyDetails = 'Allergy details are required';
  }

  return errors;
}

// Trims every string in the form state, leaving Sets and other values alone
function trimStrings(value) {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, trimStrings(entry)]),
    );
  }
  return value;
}

function formatZip(zip) {
  const digits = digitsOnly(zip);
  return digits.length === 9 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : zip;
}

// Trims text, keeps only the digits of phone numbers, and drops allergy
// details if the child has no allergies
export function cleanRegistration(registrationInfo) {
  const cleaned = trimStrings(registrationInfo);
  PHONE_FIELDS.forEach(([id]) => {
    cleaned[id] = digitsOnly(cleaned[id] ?? '');
  });
  if (cleaned.address) {
    cleaned.address.zip = formatZip(cleaned.address.zip ?? '');
  }
  if (cleaned.allergies !== 'yes') {
    cleaned.allergyDetails = '';
  }
  return cleaned;
}

// Converts form state into the record saved to Firebase. legacySources lists
// the old CC/VBS records the form was pre-filled from, if any.
export function buildRegistrationRecord(registrationInfo, legacySources, now) {
  const record = {
    ...cleanRegistration(registrationInfo),
    agreementCheckList: [...registrationInfo.agreementCheckList],
    registerTime: now.toISOString(),
    source: legacySources?.length ? 'legacy' : 'new',
  };
  if (legacySources?.length) {
    record.legacySources = legacySources;
  }
  return record;
}
