const express = require('express');

const db = require('../db');

const router = express.Router();

function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay(); // 0 = Sunday
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - dayOfWeek + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates;
}

// Returns daily verses for the current week as { [date]: { verse, referenceText } }
router.get('/', (req, res) => {
  const dates = getWeekDates();
  const placeholders = dates.map(() => '?').join(', ');

  const rows = db
    .prepare(
      `SELECT date, verse_reference, reference_text
       FROM daily_verses
       WHERE date IN (${placeholders})`,
    )
    .all(...dates);

  const result = {};
  rows.forEach(({date, verse_reference, reference_text}) => {
    result[date] = {verse: verse_reference, referenceText: reference_text};
  });

  res.json(result);
});

module.exports = router;
