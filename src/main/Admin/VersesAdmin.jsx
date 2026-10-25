import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import authFetch, {requireOk} from '../../utils/adminApi';
import Textbox from '../commonComponents/Textbox';

import StatusMessage from './StatusMessage';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function getSundays() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  const thisSunday = new Date(today);
  thisSunday.setUTCDate(today.getUTCDate() - dayOfWeek);

  const sundays = [];
  for (let i = 0; i < 53; i++) {
    const d = new Date(thisSunday);
    d.setUTCDate(thisSunday.getUTCDate() + i * 7);
    sundays.push(d.toISOString().split('T')[0]);
  }
  return sundays;
}

function getWeekDates(sundayDate) {
  const base = new Date(`${sundayDate}T00:00:00Z`);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

const StyledVersesAdmin = styled.div`
  .week-nav {
    align-items: center;
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;
  }

  .day-row {
    border-bottom: 1px solid #ccc;
    margin-bottom: 1em;
    padding-bottom: 1em;

    h4 {
      margin: 0 0 0.5em;
    }

    .day-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;

      > * {
        flex: 1;
        min-width: 200px;
      }
    }

    .verse-preview {
      font-size: 0.9em;
      margin-top: 0.4em;

      .found {
        color: green;
      }

      .snippet {
        font-style: italic;
        margin-top: 0.2em;
      }

      .not-found {
        color: red;
      }
    }
  }
`;

function stripHtml(html) {
  return new DOMParser()
    .parseFromString(html, 'text/html')
    .body.textContent.trim();
}

function makeSnippet(text) {
  const words = text.split(/\s+/);
  if (words.length <= 12) return text;
  return `${words.slice(0, 6).join(' ')} … ${words.slice(-6).join(' ')}`;
}

// Looks up a typed reference, resolving to the cleaned-up reference and a
// snippet of its text, or null when no verses match
async function lookUpReference(value) {
  try {
    const res = await fetch(`/api/verse?q=${encodeURIComponent(value)}`);
    if (!res.ok) return null;
    const {data} = await res.json();
    const allText = data.passages
      .map((passage) => stripHtml(passage.content))
      .join(' ');
    return {reference: data.reference, snippet: makeSnippet(allText)};
  } catch {
    return null;
  }
}

function VersesAdmin() {
  const sundays = getSundays();
  const [selectedSunday, setSelectedSunday] = useState(sundays[0]);
  const [versesByDate, setVersesByDate] = useState({});
  const [formByDate, setFormByDate] = useState({});
  const [previewByDate, setPreviewByDate] = useState({});
  const [savedDate, setSavedDate] = useState(null);
  const [error, setError] = useState(null);
  const debounceRefs = useRef({});

  async function loadVerses(sunday) {
    try {
      const res = await authFetch(`/api/daily-verses/${sunday}`);
      const rows = await res.json();
      const byDate = {};
      rows.forEach((row) => {
        byDate[row.date] = row;
      });
      setVersesByDate(byDate);
      const initialForm = {};
      getWeekDates(sunday).forEach((date) => {
        initialForm[date] = {
          verse_reference: byDate[date]?.verse_reference ?? '',
          reference_text: byDate[date]?.reference_text ?? '',
        };
      });
      setFormByDate(initialForm);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async API fetch
    loadVerses(selectedSunday);
  }, [selectedSunday]);

  function updateField(date, field, value) {
    setFormByDate((prev) => ({
      ...prev,
      [date]: {...prev[date], [field]: value},
    }));

    if (field === 'verse_reference') {
      clearTimeout(debounceRefs.current[date]);
      if (!value) {
        setPreviewByDate((prev) => ({...prev, [date]: null}));
        return;
      }
      setPreviewByDate((prev) => ({...prev, [date]: {status: 'checking'}}));
      debounceRefs.current[date] = setTimeout(async () => {
        const found = await lookUpReference(value);
        setPreviewByDate((prev) => ({
          ...prev,
          [date]: found ? {status: 'found', ...found} : {status: 'not-found'},
        }));
      }, 600);
    }
  }

  async function saveDay(date) {
    setError(null);
    setSavedDate(null);
    const existing = versesByDate[date];
    const typed = formByDate[date].verse_reference.trim();
    if (typed === (existing?.verse_reference ?? '')) return;
    try {
      if (!typed) {
        await requireOk(
          await authFetch(`/api/daily-verses/${existing.id}`, {
            method: 'DELETE',
          }),
        );
      } else {
        // Save the cleaned-up reference ("John 3: 15 - 16" → "John 3:15-16"),
        // or what was typed if it can't be looked up
        const verse_reference =
          (await lookUpReference(typed))?.reference ?? typed;
        const reference_text = verse_reference;
        await requireOk(
          existing
            ? await authFetch(`/api/daily-verses/${existing.id}`, {
                method: 'PUT',
                body: JSON.stringify({verse_reference, reference_text}),
              })
            : await authFetch('/api/daily-verses', {
                method: 'POST',
                body: JSON.stringify({date, verse_reference, reference_text}),
              }),
        );
      }
      await loadVerses(selectedSunday);
      setSavedDate(date);
    } catch (err) {
      setError(err.message);
    }
  }

  const weekDates = getWeekDates(selectedSunday);

  return (
    <StyledVersesAdmin>
      <h2>Daily Verses</h2>
      <div className="week-nav">
        <label htmlFor="verses-week">Week of</label>
        <select
          id="verses-week"
          onChange={(event) => {
            setError(null);
            setSavedDate(null);
            setSelectedSunday(event.target.value);
          }}
          value={selectedSunday}
        >
          {sundays.map((sunday) => (
            <option key={sunday} value={sunday}>
              {sunday}
            </option>
          ))}
        </select>
      </div>

      <StatusMessage status={error && {type: 'error', text: error}} />

      {weekDates.map((date, index) => (
        <div className="day-row" key={date}>
          <h4>
            {DAY_NAMES[index]} — {date}
          </h4>
          <div className="day-fields">
            <div>
              <Textbox
                id={`verse-ref-${date}`}
                label="Verse reference (e.g. John 3:16)"
                onBlur={() => saveDay(date)}
                onChange={(value) =>
                  updateField(date, 'verse_reference', value)
                }
                value={formByDate[date]?.verse_reference ?? ''}
              />
              {previewByDate[date] && (
                <div className="verse-preview">
                  {previewByDate[date].status === 'checking' && (
                    <span>Checking…</span>
                  )}
                  {previewByDate[date].status === 'found' && (
                    <>
                      <div className="found">
                        ✓ Will use:{' '}
                        <strong>{previewByDate[date].reference}</strong>
                      </div>
                      <div className="snippet">
                        {previewByDate[date].snippet}
                      </div>
                    </>
                  )}
                  {previewByDate[date].status === 'not-found' && (
                    <span className="not-found">✗ Passage not found</span>
                  )}
                </div>
              )}
              {savedDate === date && (
                <span style={{color: 'green', fontSize: '0.9em'}}>Saved.</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </StyledVersesAdmin>
  );
}

export default VersesAdmin;
