const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'church.db');
const db = new sqlite3.Database(DB_PATH);

// Promisified helpers used by routes
db.getAsync = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row))),
  );

db.allAsync = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows))),
  );

db.runAsync = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    }),
  );

// Initialize schema on startup
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sermon_videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    youtube_id TEXT,
    preacher TEXT,
    title TEXT,
    scripture TEXT,
    bible_version TEXT,
    expires INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS daily_verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    verse_reference TEXT NOT NULL,
    reference_text TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS weekly_meditations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week_start_date TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    content TEXT NOT NULL
  )`);
});

module.exports = db;
