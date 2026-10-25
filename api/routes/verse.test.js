import {createRequire} from 'module';

import {describe, expect, it} from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const {parseReference} = nodeRequire('./verse');

const referenceOf = (ref) => parseReference(ref).reference;

describe('parseReference', () => {
  it('ignores spaces around separators', () => {
    expect(referenceOf('John 3:15-16')).toBe('John 3:15-16');
    expect(referenceOf('John 3: 15 - 16')).toBe('John 3:15-16');
    expect(referenceOf('  John  3 :15 -16 ')).toBe('John 3:15-16');
  });

  it('accepts dots and en dashes', () => {
    expect(referenceOf('John 3.15-16')).toBe('John 3:15-16');
    expect(referenceOf('John 3:15–16')).toBe('John 3:15-16');
  });

  it('matches book names regardless of case and spacing', () => {
    expect(referenceOf('john 3:16')).toBe('John 3:16');
    expect(referenceOf('1john 4:8')).toBe('1 John 4:8');
    expect(referenceOf('song of songs 2:1')).toBe('Song of Solomon 2:1');
    expect(referenceOf('Psalm 23')).toBe('Psalms 23');
  });

  it('rejects abbreviated book names', () => {
    expect(parseReference('Jn 3:16')).toEqual({segments: [], reference: ''});
    expect(referenceOf('Ps 23')).toBe('');
  });

  it('parses a single verse', () => {
    expect(parseReference('John 3:16').segments).toEqual([
      {book: 'John', chapter: 3, verseStart: 16, verseEnd: 16},
    ]);
  });

  it('parses whole chapters', () => {
    expect(parseReference('Romans 8-9')).toEqual({
      segments: [
        {book: 'Romans', chapter: 8, verseStart: 1, verseEnd: Infinity},
        {book: 'Romans', chapter: 9, verseStart: 1, verseEnd: Infinity},
      ],
      reference: 'Romans 8-9',
    });
  });

  it('parses a cross-chapter range', () => {
    expect(parseReference('Galatians 3:23 - 4:7')).toEqual({
      segments: [
        {book: 'Galatians', chapter: 3, verseStart: 23, verseEnd: Infinity},
        {book: 'Galatians', chapter: 4, verseStart: 1, verseEnd: 7},
      ],
      reference: 'Galatians 3:23-4:7',
    });
  });

  it('continues the chapter after a comma', () => {
    expect(parseReference('Philippians 1:12-14, 27-30')).toEqual({
      segments: [
        {book: 'Philippians', chapter: 1, verseStart: 12, verseEnd: 14},
        {book: 'Philippians', chapter: 1, verseStart: 27, verseEnd: 30},
      ],
      reference: 'Philippians 1:12-14, 27-30',
    });
  });

  it('continues the book after a semicolon', () => {
    expect(referenceOf('Luke 9:23-27; 9:57-62')).toBe('Luke 9:23-27; 9:57-62');
    expect(referenceOf('Luke 9:23; John 1:1')).toBe('Luke 9:23; John 1:1');
  });

  it('leaves out parts it cannot parse', () => {
    expect(referenceOf('John 3:16, abc')).toBe('John 3:16');
    expect(referenceOf('Genesis 1-9999')).toBe('');
  });
});
