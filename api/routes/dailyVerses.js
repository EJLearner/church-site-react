const express = require('express');

const db = require('../db');

const router = express.Router();

function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - dayOfWeek + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates;
}

// Returns daily verses for the current week as { [date]: { verse, referenceText } }
router.get('/', async (req, res) => {
  try {
    const dates = getWeekDates();
    const placeholders = dates.map(() => '?').join(', ');

    const rows = await db.allAsync(
      `SELECT date, verse_reference, reference_text
       FROM daily_verses
       WHERE date IN (${placeholders})`,
      dates,
    );

    const result = {};
    rows.forEach(({date, verse_reference, reference_text}) => {
      result[date] = {verse: verse_reference, referenceText: reference_text};
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
