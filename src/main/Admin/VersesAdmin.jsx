import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import authFetch from '../../utils/adminApi';
import Textbox from '../commonComponents/Textbox';

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
      font-style: italic;
      margin-top: 0.4em;

      .found {
        color: green;
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
    setError(null);
    setSavedDate(null);
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
        try {
          const res = await fetch(`/api/verse?q=${encodeURIComponent(value)}`);
          if (!res.ok) {
            setPreviewByDate((prev) => ({
              ...prev,
              [date]: {status: 'not-found'},
            }));
            return;
          }
          const data = await res.json();
          const passages = data?.data?.passages ?? [];
          const allText = passages
            .map((passage) => stripHtml(passage.content))
            .join(' ');
          setPreviewByDate((prev) => ({
            ...prev,
            [date]: {status: 'found', snippet: makeSnippet(allText)},
          }));
        } catch {
          setPreviewByDate((prev) => ({
            ...prev,
            [date]: {status: 'not-found'},
          }));
        }
      }, 600);
    }
  }

  async function saveDay(date) {
    setError(null);
    setSavedDate(null);
    const existing = versesByDate[date];
    const {verse_reference} = formByDate[date];
    const reference_text = verse_reference;
    try {
      if (!verse_reference) {
        if (existing) {
          await authFetch(`/api/daily-verses/${existing.id}`, {
            method: 'DELETE',
          });
          await loadVerses(selectedSunday);
        }
        return;
      }
      if (existing) {
        await authFetch(`/api/daily-verses/${existing.id}`, {
          method: 'PUT',
          body: JSON.stringify({verse_reference, reference_text}),
        });
      } else {
        await authFetch('/api/daily-verses', {
          method: 'POST',
          body: JSON.stringify({date, verse_reference, reference_text}),
        });
      }
      setSavedDate(date);
      await loadVerses(selectedSunday);
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
          onChange={(event) => setSelectedSunday(event.target.value)}
          value={selectedSunday}
        >
          {sundays.map((sunday) => (
            <option key={sunday} value={sunday}>
              {sunday}
            </option>
          ))}
        </select>
      </div>

      {error && <div style={{color: 'red'}}>{error}</div>}

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
                    <span className="found">
                      ✓ {previewByDate[date].snippet}
                    </span>
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
