const express = require('express');

const db = require('../db');

const router = express.Router();

function getCurrentSunday() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  const sunday = new Date(today);
  sunday.setUTCDate(today.getUTCDate() - dayOfWeek);
  return sunday.toISOString().split('T')[0];
}

// Returns the most recent meditation on or before the current Sunday
router.get('/', (req, res) => {
  const sunday = getCurrentSunday();

  const meditation = db
    .prepare(
      `SELECT * FROM weekly_meditations
       WHERE week_start_date <= ?
       ORDER BY week_start_date DESC
       LIMIT 1`,
    )
    .get(sunday);

  res.json(meditation || null);
});

module.exports = router;
