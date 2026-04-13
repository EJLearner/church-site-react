const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Expected format of api/data/asv.json (bibleapi-bibles-json):
// { "resultset": { "row": [{ "field": [id, bookNum, chapter, verse, text] }, ...] } }
// Download from: https://github.com/bibleapi/bibleapi-bibles-json
const ASV_PATH = path.join(__dirname, '../data/asv.json');

const BOOK_NAMES = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Joshua',
  'Judges',
  'Ruth',
  '1 Samuel',
  '2 Samuel',
  '1 Kings',
  '2 Kings',
  '1 Chronicles',
  '2 Chronicles',
  'Ezra',
  'Nehemiah',
  'Esther',
  'Job',
  'Psalms',
  'Proverbs',
  'Ecclesiastes',
  'Song of Solomon',
  'Isaiah',
  'Jeremiah',
  'Lamentations',
  'Ezekiel',
  'Daniel',
  'Hosea',
  'Joel',
  'Amos',
  'Obadiah',
  'Jonah',
  'Micah',
  'Nahum',
  'Habakkuk',
  'Zephaniah',
  'Haggai',
  'Zechariah',
  'Malachi',
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
];

let asvData = null;
try {
  const raw = JSON.parse(fs.readFileSync(ASV_PATH, 'utf8'));
  // Build nested lookup: { bookName: { chapter: { verse: text } } }
  asvData = {};
  for (const {field} of raw.resultset.row) {
    const [, bookNum, chapter, verse, text] = field;
    const bookName = BOOK_NAMES[bookNum - 1];
    if (!bookName) continue;
    if (!asvData[bookName]) asvData[bookName] = {};
    if (!asvData[bookName][chapter]) asvData[bookName][chapter] = {};
    asvData[bookName][chapter][verse] = text;
  }
} catch {
  console.warn(
    'ASV JSON not found at',
    ASV_PATH,
    '\nDownload asv.json from https://github.com/bibleapi/bibleapi-bibles-json',
    'and place it at api/data/asv.json to enable the /api/verse endpoint.',
  );
}

// Maps reference book names to JSON key names
const BOOK_NAME_MAP = {
  Psalm: 'Psalms',
  Song: 'Song of Solomon',
  'Song of Songs': 'Song of Solomon',
};

function normalizeBook(name) {
  return BOOK_NAME_MAP[name] || name;
}

// Parses verse references into segments: { book, chapter, verseStart, verseEnd }
// Handles formats like:
//   "John 3.16"             → single verse
//   "Romans 8"              → whole chapter
//   "Romans 8.31-39"        → verse range
//   "Galatians 3.23-4.7"    → cross-chapter range
//   "Luke 9.23-27; 9.57-62" → semicolon-separated ranges
//   "Philippians 1.12-14, 27-30" → comma-separated ranges in same chapter
function parseReference(ref) {
  const segments = [];

  // Normalize colon chapter:verse separator to dot (e.g. "John 3:16" → "John 3.16")
  const normalized = ref.replace(/(\d):(\d)/g, '$1.$2');

  // Split on semicolons first
  const semicolonParts = normalized.split(';').map((s) => s.trim());

  for (const part of semicolonParts) {
    // Match book name (handles "1 John", "2 Corinthians", etc.)
    const bookMatch = part.match(/^(\d?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(.+)$/);
    if (!bookMatch) continue;

    const book = bookMatch[1].trim();
    const rest = bookMatch[2].trim();

    // No dot → whole chapter (e.g. "Romans 8")
    if (!rest.includes('.')) {
      segments.push({
        book,
        chapter: parseInt(rest),
        verseStart: 1,
        verseEnd: Infinity,
      });
      continue;
    }

    // Split on commas for multiple ranges (may or may not have a dot)
    const commaParts = rest.split(',').map((s) => s.trim());
    let lastChapter = null;

    for (const commaPart of commaParts) {
      if (commaPart.includes('.')) {
        // Full chapter.verse reference (possibly a range)
        // e.g. "3.23-4.7", "3.16", "3.23-27"
        const match = commaPart.match(
          /^(\d+)\.(\d+)(?:-(\d+)\.(\d+)|-(\d+))?$/,
        );
        if (!match) continue;

        const chStart = parseInt(match[1]);
        const vStart = parseInt(match[2]);
        lastChapter = chStart;

        if (match[3] && match[4]) {
          // Cross-chapter: 3.23-4.7
          const chEnd = parseInt(match[3]);
          const vEnd = parseInt(match[4]);
          for (let ch = chStart; ch <= chEnd; ch++) {
            if (ch === chStart && ch === chEnd) {
              segments.push({
                book,
                chapter: ch,
                verseStart: vStart,
                verseEnd: vEnd,
              });
            } else if (ch === chStart) {
              segments.push({
                book,
                chapter: ch,
                verseStart: vStart,
                verseEnd: Infinity,
              });
            } else if (ch === chEnd) {
              segments.push({book, chapter: ch, verseStart: 1, verseEnd: vEnd});
            } else {
              segments.push({
                book,
                chapter: ch,
                verseStart: 1,
                verseEnd: Infinity,
              });
            }
          }
          lastChapter = chEnd;
        } else if (match[5]) {
          // Same-chapter range: 3.16-18
          segments.push({
            book,
            chapter: chStart,
            verseStart: vStart,
            verseEnd: parseInt(match[5]),
          });
        } else {
          // Single verse: 3.16
          segments.push({
            book,
            chapter: chStart,
            verseStart: vStart,
            verseEnd: vStart,
          });
        }
      } else if (lastChapter !== null) {
        // Verse-only range continuing previous chapter: "27-30" after "1.12-14"
        const rangeMatch = commaPart.match(/^(\d+)(?:-(\d+))?$/);
        if (!rangeMatch) continue;
        const vStart = parseInt(rangeMatch[1]);
        const vEnd = rangeMatch[2] ? parseInt(rangeMatch[2]) : vStart;
        segments.push({
          book,
          chapter: lastChapter,
          verseStart: vStart,
          verseEnd: vEnd,
        });
      }
    }
  }

  return segments;
}

function lookupSegment(book, chapter, verseStart, verseEnd) {
  const normalizedBook = normalizeBook(book);
  const chapterData = asvData[normalizedBook]?.[String(chapter)];
  if (!chapterData) return [];

  const verseNums = Object.keys(chapterData)
    .map(Number)
    .sort((a, b) => a - b);

  return verseNums
    .filter((n) => n >= verseStart && (verseEnd === Infinity || n <= verseEnd))
    .map((n) => ({num: n, text: chapterData[String(n)]}));
}

function buildPassageContent(book, chapter, verses) {
  const lines = verses
    .map(({num, text}) => `<span class="v">${num}</span> ${text}`)
    .join(' ');
  return `<p>${lines}</p>`;
}

// GET /api/verse?q=Romans+8.31-39
router.get('/', (req, res) => {
  if (!asvData) {
    return res
      .status(503)
      .json({error: 'Bible data not available. See server logs.'});
  }

  const {q} = req.query;
  if (!q) {
    return res.status(400).json({error: 'Missing required query parameter: q'});
  }

  const segments = parseReference(q);
  if (segments.length === 0) {
    return res.status(400).json({error: `Could not parse reference: ${q}`});
  }

  // Group segments into passages by book+chapter for readable output
  const passageMap = new Map();
  for (const {book, chapter, verseStart, verseEnd} of segments) {
    const key = `${book} ${chapter}`;
    if (!passageMap.has(key)) passageMap.set(key, {book, chapter, verses: []});
    const found = lookupSegment(book, chapter, verseStart, verseEnd);
    passageMap.get(key).verses.push(...found);
  }

  const passages = [...passageMap.entries()]
    .filter(([, {verses}]) => verses.length > 0)
    .map(([, {book, chapter, verses}]) => ({
      reference: `${book} ${chapter}`,
      content: buildPassageContent(book, chapter, verses),
    }));

  if (passages.length === 0) {
    return res.status(404).json({error: `No verses found for: ${q}`});
  }

  res.json({data: {passages}});
});

module.exports = router;
