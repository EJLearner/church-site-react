const express = require('express');

const db = require('../db');
const {requireAuth} = require('../firebaseAdmin');

const router = express.Router();

// Returns sermons from the past 150 days, plus any with expires=0 (permanent)
router.get('/', async (req, res) => {
  try {
    const sermons = await db.allAsync(
      `SELECT * FROM sermon_videos
       WHERE expires = 0
         OR (date >= date('now', '-150 days') AND date <= date('now'))
       ORDER BY date DESC`,
    );
    res.json(sermons);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// Returns all sermons for admin view
router.get('/all', requireAuth, async (req, res) => {
  try {
    const sermons = await db.allAsync(
      `SELECT * FROM sermon_videos ORDER BY date DESC`,
    );
    res.json(sermons);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post('/', requireAuth, async (req, res) => {
  const {date, youtube_id, preacher, title, scripture, bible_version, expires} =
    req.body;
  try {
    const result = await db.runAsync(
      `INSERT INTO sermon_videos (date, youtube_id, preacher, title, scripture, bible_version, expires)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        youtube_id,
        preacher,
        title,
        scripture,
        bible_version,
        expires ?? 1,
      ],
    );
    res.status(201).json({id: result.lastID});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const {date, youtube_id, preacher, title, scripture, bible_version, expires} =
    req.body;
  try {
    await db.runAsync(
      `UPDATE sermon_videos
       SET date=?, youtube_id=?, preacher=?, title=?, scripture=?, bible_version=?, expires=?
       WHERE id=?`,
      [
        date,
        youtube_id,
        preacher,
        title,
        scripture,
        bible_version,
        expires ?? 1,
        req.params.id,
      ],
    );
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.runAsync(`DELETE FROM sermon_videos WHERE id=?`, [req.params.id]);
    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
