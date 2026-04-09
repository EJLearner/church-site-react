const express = require('express');

const db = require('../db');

const router = express.Router();

// Returns sermons from the past 150 days, plus any with expires=0 (permanent)
router.get('/', (req, res) => {
  const sermons = db
    .prepare(
      `
    SELECT * FROM sermon_videos
    WHERE expires = 0
      OR (date >= date('now', '-150 days') AND date <= date('now'))
    ORDER BY date DESC
  `,
    )
    .all();

  res.json(sermons);
});

module.exports = router;
