const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'church.db');
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS sermon_videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    youtube_id TEXT,
    preacher TEXT,
    title TEXT,
    scripture TEXT,
    bible_version TEXT,
    expires INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS daily_verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    verse_reference TEXT NOT NULL,
    reference_text TEXT
  );

  CREATE TABLE IF NOT EXISTS weekly_meditations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week_start_date TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    content TEXT NOT NULL
  );
`);

module.exports = db;
