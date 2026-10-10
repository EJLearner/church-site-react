// Converts old CC/VBS registration records (exported from Firebase) into the
// shape used by the Sunday School registration form, so admins can look up
// a returning child and pre-fill the form for the parent to review.

const LEGACY_TABLES = [
  'ccRegisteredChildren',
  'vbsRegisteredChildren',
  'vbsRegisteredStudents',
];

const NAME_SUFFIXES = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv']);

// Matches the ways people wrote "no allergies": N/A, n/a, N\A, NA, Na, none
const NO_ALLERGIES_PATTERN = /^(n[/\\]?a|none)$/i;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

// Removes blank and repeated names, ignoring case, extra spaces and curly vs
// straight apostrophes, keeping the first spelling seen
function uniqueNames(names) {
  const seen = new Map();
  names.forEach((name) => {
    const tidied = clean(name)
      .replace(/\s+/g, ' ')
      .replace(/\u2019/g, "'");
    const key = tidied.toLowerCase();
    if (tidied && !seen.has(key)) {
      seen.set(key, tidied);
    }
  });
  return [...seen.values()];
}

// Splits "Mary Ann Smith Jr" into {first: 'Mary Ann', last: 'Smith Jr'}
function splitName(fullName) {
  const words = clean(fullName).split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return {first: words[0] ?? '', last: ''};
  }

  let lastStart = words.length - 1;
  if (NAME_SUFFIXES.has(words[lastStart].toLowerCase()) && lastStart > 1) {
    lastStart -= 1;
  }
  return {
    first: words.slice(0, lastStart).join(' '),
    last: words.slice(lastStart).join(' '),
  };
}

function convertAllergies(knownAllergies) {
  const text = clean(knownAllergies);
  if (!text) {
    return {allergies: '', allergyDetails: ''};
  }
  if (NO_ALLERGIES_PATTERN.test(text)) {
    return {allergies: 'no', allergyDetails: ''};
  }
  return {allergies: 'yes', allergyDetails: text};
}

// Converts one legacy record into form values. VBS student records store the
// child's name in studentName and the parent's contact info in email/phone.
function convertRecord(record) {
  const parentNames = uniqueNames([
    record.parentName,
    ...(record.parentNames ?? []),
  ]);
  const parentName = parentNames[0] ?? '';

  return {
    values: {
      childName: splitName(record.childName ?? record.studentName),
      childDateOfBirth: clean(record.childDob),
      parentName: splitName(parentName),
      parentEmail: clean(record.parentEmail ?? record.email),
      parentPhone: clean(record.parentPhone ?? record.phone),
      address: {
        streetLine1: clean(record.address1),
        streetLine2: clean(record.address2),
        city: clean(record.city),
        state: clean(record.state),
        zip: clean(record.zip),
      },
      ...convertAllergies(record.knownAllergies),
      subscribe: record.subscribe === true,
    },
    parentNames,
  };
}

const groupKey = (values) =>
  [
    `${values.childName.first} ${values.childName.last}`.toLowerCase(),
    values.childDateOfBirth,
  ].join('|');

// Copies non-empty fields from newer over older, including nested objects.
// Booleans (subscribe) always take the newer value.
function mergeValues(older, newer) {
  const merged = {...older};
  Object.entries(newer).forEach(([field, value]) => {
    if (value && typeof value === 'object') {
      merged[field] = mergeValues(older[field] ?? {}, value);
    } else if (value !== '') {
      merged[field] = value;
    }
  });
  return merged;
}

// Flattens the legacy tables into one entry per child (matched on name and
// date of birth). When a child registered more than once, newer non-empty
// fields win and every source record is listed.
function buildLegacyEntries(legacyData) {
  const records = [];
  LEGACY_TABLES.forEach((table) => {
    Object.entries(legacyData?.[table] ?? {}).forEach(([year, yearRecords]) => {
      Object.entries(yearRecords ?? {}).forEach(([id, record]) => {
        // Only children register for Sunday School
        if (!record || record.type === 'ADULT') {
          return;
        }
        records.push({
          ...convertRecord(record),
          source: {table, year, id},
          sortKey: clean(record.registerTime) || `${year}-01-01`,
        });
      });
    });
  });
  records.sort((first, second) => first.sortKey.localeCompare(second.sortKey));

  const entries = new Map();
  records.forEach(({values, parentNames, source}) => {
    const key = groupKey(values);
    const existing = entries.get(key);
    if (!existing) {
      entries.set(key, {
        id: `${source.table}/${source.year}/${source.id}`,
        lastRegistered: source.year,
        parentNames,
        sources: [source],
        values,
      });
      return;
    }
    existing.id = `${source.table}/${source.year}/${source.id}`;
    existing.lastRegistered = source.year;
    existing.parentNames = uniqueNames([
      ...existing.parentNames,
      ...parentNames,
    ]);
    existing.sources.push(source);
    existing.values = mergeValues(existing.values, values);
    // Allergy answer and details belong together, so take both from the newest
    // record that answered rather than mixing an old "yes" detail with a new "no"
    if (values.allergies) {
      existing.values.allergyDetails = values.allergyDetails;
    }
  });

  return [...entries.values()].sort((first, second) =>
    `${first.values.childName.last} ${first.values.childName.first}`.localeCompare(
      `${second.values.childName.last} ${second.values.childName.first}`,
    ),
  );
}

module.exports = {
  buildLegacyEntries,
  convertAllergies,
  splitName,
};
