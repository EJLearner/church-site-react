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

// Other full names a book goes by, keyed like BOOKS_BY_KEY
const BOOK_ALIASES = {
  psalm: 'Psalms',
  song: 'Song of Solomon',
  songofsongs: 'Song of Solomon',
};

// Lowercase name without spaces, so "1john" and "1 John" match
const bookKey = (name) => name.replace(/\s+/g, '').toLowerCase();

const BOOKS_BY_KEY = Object.fromEntries(
  BOOK_NAMES.map((name) => [bookKey(name), name]),
);

// Returns the book's name as it appears in BOOK_NAMES, or null when it isn't
// a book of the Bible
function resolveBook(name) {
  const key = bookKey(name);
  return BOOKS_BY_KEY[key] ?? BOOK_ALIASES[key] ?? null;
}

// Removes spaces around separators and turns dashes into "-" and colons into
// ".": "John 3: 15 – 16" → "John 3.15-16"
function normalizeReference(ref) {
  return ref
    .trim()
    .replace(/[‐-―]/g, '-')
    .replace(/\s*([:.,;-])\s*/g, '$1')
    .replace(/:/g, '.')
    .replace(/\s+/g, ' ');
}

// The numbers captured by a regex match, leaving unmatched groups undefined
const matchedNumbers = (match) =>
  match.slice(1).map((value) => value && Number(value));

// Longest chapter range accepted, to keep lookups bounded
const MAX_CHAPTER_SPAN = 150;

// Parses a verse reference into segments ({book, chapter, verseStart,
// verseEnd}) plus the cleaned-up reference text that the segments cover.
// Spaces are ignored, chapter and verse may be separated by ":" or ".", and
// book names are matched regardless of case. Handles formats like:
//   "John 3:16"                  → single verse
//   "Romans 8"                   → whole chapter
//   "Romans 8:31-39"             → verse range
//   "Galatians 3:23-4:7"         → cross-chapter range
//   "Luke 9:23-27; 9:57-62"      → semicolon-separated ranges
//   "Philippians 1:12-14, 27-30" → comma-separated ranges in same chapter
// Parts that can't be parsed are left out of both.
function parseReference(ref) {
  const segments = [];
  const referenceParts = [];
  let book = null;
  let lastReferenceBook = null;

  // Adds every verse from chStart.vStart through chEnd.vEnd
  function pushRange(chStart, vStart, chEnd, vEnd) {
    for (let chapter = chStart; chapter <= chEnd; chapter++) {
      segments.push({
        book,
        chapter,
        verseStart: chapter === chStart ? vStart : 1,
        verseEnd: chapter === chEnd ? vEnd : Infinity,
      });
    }
  }

  for (const part of normalizeReference(ref).split(';')) {
    // A part without a book ("9.57-62") continues the previous part's book
    const bookMatch = part.match(/^(\d?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s*(.*)$/);
    let rest = part;
    if (bookMatch) {
      book = resolveBook(bookMatch[1]);
      rest = bookMatch[2];
    }
    if (!book) continue;

    const pieces = [];
    // Set once a chapter.verse is seen, so later bare numbers are verses
    let chapter = null;

    for (const piece of rest.split(',')) {
      const verseMatch = piece.match(/^(\d+)\.(\d+)(?:-(\d+)(?:\.(\d+))?)?$/);
      const numberMatch = piece.match(/^(\d+)(?:-(\d+))?$/);

      if (verseMatch) {
        const [chStart, vStart, end, endVerse] = matchedNumbers(verseMatch);
        if (endVerse) {
          // Cross-chapter: 3.23-4.7
          if (end < chStart || end - chStart > MAX_CHAPTER_SPAN) continue;
          pushRange(chStart, vStart, end, endVerse);
          pieces.push(`${chStart}:${vStart}-${end}:${endVerse}`);
          chapter = end;
        } else {
          // Single verse (3.16) or same-chapter range (3.16-18)
          pushRange(chStart, vStart, chStart, end || vStart);
          pieces.push(`${chStart}:${vStart}${end ? `-${end}` : ''}`);
          chapter = chStart;
        }
      } else if (numberMatch) {
        const [start, end] = matchedNumbers(numberMatch);
        if (chapter !== null) {
          // Verses continuing the previous chapter: "27-30" after "1.12-14"
          pushRange(chapter, start, chapter, end || start);
        } else {
          // Whole chapters: "8" or "8-9"
          if (end && (end < start || end - start > MAX_CHAPTER_SPAN)) continue;
          pushRange(start, 1, end || start, Infinity);
        }
        pieces.push(`${start}${end ? `-${end}` : ''}`);
      }
    }

    if (pieces.length > 0) {
      const prefix = book === lastReferenceBook ? '' : `${book} `;
      referenceParts.push(`${prefix}${pieces.join(', ')}`);
      lastReferenceBook = book;
    }
  }

  return {segments, reference: referenceParts.join('; ')};
}

function lookupSegment(book, chapter, verseStart, verseEnd) {
  const chapterData = asvData[book]?.[String(chapter)];
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

  const {segments, reference} = parseReference(q);
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

  res.json({data: {reference, passages}});
});

module.exports = router;
module.exports.parseReference = parseReference;
