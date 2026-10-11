// Provides /api/legacy-registrations for the Sunday School admin page.
// Returns past CC/VBS registrations, one entry per child, so admins can find
// a returning child and pre-fill their Sunday School form. The data contains
// children's personal information, so every request requires admin group
// membership.

const express = require('express');
const fs = require('fs');
const path = require('path');

const {requireAuth, requireGroup} = require('../firebaseAdmin');
const {buildLegacyEntries} = require('../legacyRegistrations');

// Copy of ccRegisteredChildren, vbsRegisteredChildren and
// vbsRegisteredStudents from the old Firebase export. Not checked into git.
const LEGACY_PATH = path.join(__dirname, '../data/legacyRegistrations.json');

let legacyEntries = null;
try {
  legacyEntries = buildLegacyEntries(
    JSON.parse(fs.readFileSync(LEGACY_PATH, 'utf8')),
  );
} catch {
  console.warn(
    'Legacy registrations JSON not found at',
    LEGACY_PATH,
    '\nCopy it to the server to enable the /api/legacy-registrations endpoint.',
  );
}

const router = express.Router();

// GET /api/legacy-registrations
router.get('/', requireAuth, requireGroup('admins'), (req, res) => {
  if (!legacyEntries) {
    return res
      .status(503)
      .json({error: 'Legacy registration data not available.'});
  }

  res.json(legacyEntries);
});

module.exports = router;
