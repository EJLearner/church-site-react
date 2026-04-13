const express = require('express');

const db = require('../db');
const {requireAuth} = require('../firebaseAdmin');

const router = express.Router();

function getCurrentSunday() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  const sunday = new Date(today);
  sunday.setUTCDate(today.getUTCDate() - dayOfWeek);
  return sunday.toISOString().split('T')[0];
}

// Returns the meditation for the current week
router.get('/', async (req, res) => {
  try {
    const sunday = getCurrentSunday();
    const meditation = await db.getAsync(
      `SELECT * FROM weekly_meditations WHERE week_start_date = ?`,
      [sunday],
    );
    res.json(meditation || null);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// Returns meditation for a specific week (admin)
router.get('/:weekStartDate', requireAuth, async (req, res) => {
  try {
    const meditation = await db.getAsync(
      `SELECT * FROM weekly_meditations WHERE week_start_date = ?`,
      [req.params.weekStartDate],
    );
    res.json(meditation || null);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post('/', requireAuth, async (req, res) => {
  const {week_start_date, subtitle, content} = req.body;
  try {
    const result = await db.runAsync(
      `INSERT INTO weekly_meditations (week_start_date, subtitle, content)
       VALUES (?, ?, ?)`,
      [week_start_date, subtitle, content],
    );
    res.status(201).json({id: result.lastID});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.put('/:weekStartDate', requireAuth, async (req, res) => {
  const {subtitle, content} = req.body;
  try {
    await db.runAsync(
      `UPDATE weekly_meditations SET subtitle=?, content=? WHERE week_start_date=?`,
      [subtitle, content, req.params.weekStartDate],
    );
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/:weekStartDate', requireAuth, async (req, res) => {
  try {
    await db.runAsync(
      `DELETE FROM weekly_meditations WHERE week_start_date=?`,
      [req.params.weekStartDate],
    );
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
