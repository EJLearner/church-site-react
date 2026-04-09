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
router.get('/', async (req, res) => {
  try {
    const sunday = getCurrentSunday();
    const meditation = await db.getAsync(
      `SELECT * FROM weekly_meditations
       WHERE week_start_date <= ?
       ORDER BY week_start_date DESC
       LIMIT 1`,
      [sunday],
    );
    res.json(meditation || null);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
