const express = require('express');

const db = require('../db');
const {requireAuth} = require('../firebaseAdmin');

const router = express.Router();

function getWeekDates(sundayDate) {
  const base = sundayDate ? new Date(`${sundayDate}T00:00:00Z`) : new Date();
  if (!sundayDate) {
    const dayOfWeek = base.getUTCDay();
    base.setUTCDate(base.getUTCDate() - dayOfWeek);
  }
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() + i);
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

// Returns daily verses for a specific week (admin)
router.get('/:sundayDate', requireAuth, async (req, res) => {
  try {
    const dates = getWeekDates(req.params.sundayDate);
    const placeholders = dates.map(() => '?').join(', ');

    const rows = await db.allAsync(
      `SELECT id, date, verse_reference, reference_text
       FROM daily_verses
       WHERE date IN (${placeholders})`,
      dates,
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post('/', requireAuth, async (req, res) => {
  const {date, verse_reference, reference_text} = req.body;
  try {
    const result = await db.runAsync(
      `INSERT INTO daily_verses (date, verse_reference, reference_text)
       VALUES (?, ?, ?)`,
      [date, verse_reference, reference_text],
    );
    res.status(201).json({id: result.lastID});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const {verse_reference, reference_text} = req.body;
  try {
    await db.runAsync(
      `UPDATE daily_verses SET verse_reference=?, reference_text=? WHERE id=?`,
      [verse_reference, reference_text, req.params.id],
    );
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.runAsync(`DELETE FROM daily_verses WHERE id=?`, [req.params.id]);
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
