import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import authFetch from '../../utils/adminApi';
import constants from '../../utils/constants';
import Button from '../commonComponents/Button/Button';
import Textbox from '../commonComponents/Textbox';

const OTHER_PREACHER = '__other__';

const PREACHER_OPTIONS = [
  ...Object.values(constants.PREACHERS),
  OTHER_PREACHER,
];

const BIBLE_VERSION_OPTIONS = ['', ...Object.values(constants.BIBLE_VERSIONS)];

function emptyForm() {
  return {
    date: new Date().toISOString().split('T')[0],
    youtube_id: '',
    preacher: '',
    preacherOther: '',
    title: '',
    scripture: '',
    bible_version: '',
  };
}

const StyledSermonAdmin = styled.div`
  .sermon-list {
    margin-bottom: 2em;

    table {
      width: 100%;
    }
  }

  .form-section {
    border-top: 2px solid var(--charcoal-grey);
    padding-top: 1em;
  }

  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-bottom: 1em;

    > * {
      flex: 1;
      min-width: 200px;
    }
  }

  .youtube-status {
    margin-bottom: 1em;

    .valid {
      color: green;
    }

    .invalid {
      color: red;
    }
  }

  .form-actions {
    display: flex;
    gap: 0.5em;
    margin-top: 1em;
  }
`;

function SermonAdmin() {
  const [sermons, setSermons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [youtubeStatus, setYoutubeStatus] = useState(null);
  const [youtubeTitle, setYoutubeTitle] = useState(null);
  const youtubeDebounceRef = useRef(null);

  /* eslint-disable react-hooks/set-state-in-effect -- YouTube ID validation state */
  useEffect(() => {
    clearTimeout(youtubeDebounceRef.current);
    if (!form.youtube_id) {
      setYoutubeStatus(null);
      setYoutubeTitle(null);
      return;
    }
    setYoutubeStatus('checking');
    setYoutubeTitle(null);
    youtubeDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${form.youtube_id}&format=json`,
        );
        if (res.ok) {
          const data = await res.json();
          setYoutubeStatus('valid');
          setYoutubeTitle(data.title);
        } else {
          setYoutubeStatus('invalid');
        }
      } catch {
        setYoutubeStatus('invalid');
      }
    }, 600);
  }, [form.youtube_id]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function loadSermons() {
    const res = await authFetch('/api/sermons/all');
    const data = await res.json();
    setSermons(data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async API fetch
    loadSermons();
  }, []);

  function startEdit(sermon) {
    const isKnownPreacher = PREACHER_OPTIONS.includes(sermon.preacher);
    setForm({
      date: sermon.date ?? '',
      youtube_id: sermon.youtube_id ?? '',
      preacher: isKnownPreacher ? sermon.preacher : OTHER_PREACHER,
      preacherOther: isKnownPreacher ? '' : (sermon.preacher ?? ''),
      title: sermon.title ?? '',
      scripture: sermon.scripture ?? '',
      bible_version: sermon.bible_version ?? '',
    });
    setEditingId(sermon.id);
    setError(null);
  }

  function startNew() {
    setForm(emptyForm());
    setEditingId(null);
    setError(null);
  }

  function getPreacherValue() {
    return form.preacher === OTHER_PREACHER
      ? form.preacherOther
      : form.preacher;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      date: form.date,
      youtube_id: form.youtube_id,
      preacher: getPreacherValue(),
      title: form.title || null,
      scripture: form.scripture || null,
      bible_version: form.bible_version || null,
    };

    try {
      if (editingId) {
        await authFetch(`/api/sermons/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
      } else {
        await authFetch('/api/sermons', {
          method: 'POST',
          body: JSON.stringify(body),
        });
      }
      await loadSermons();
      startNew();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this sermon?')) return;
    try {
      await authFetch(`/api/sermons/${id}`, {method: 'DELETE'});
      await loadSermons();
      if (editingId === id) startNew();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <StyledSermonAdmin>
      <div className="sermon-list">
        <h2>Sermons</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Preacher</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sermons.map((sermon) => (
              <tr key={sermon.id}>
                <td>{sermon.date}</td>
                <td>{sermon.preacher}</td>
                <td>{sermon.title}</td>
                <td>
                  <Button onClick={() => startEdit(sermon)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-section">
        <h3>{editingId ? 'Edit Sermon' : 'New Sermon'}</h3>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <Textbox
              id="sermon-date"
              label="Date (YYYY-MM-DD)"
              onChange={(value) => setForm((prev) => ({...prev, date: value}))}
              required
              value={form.date}
            />
            <Textbox
              id="sermon-youtube-id"
              label="YouTube ID"
              onChange={(value) =>
                setForm((prev) => ({...prev, youtube_id: value}))
              }
              value={form.youtube_id}
            />
          </div>
          {youtubeStatus && (
            <div className="youtube-status">
              {youtubeStatus === 'checking' && <span>Checking...</span>}
              {youtubeStatus === 'valid' && (
                <span className="valid">
                  ✓ Video found{youtubeTitle ? `: ${youtubeTitle}` : ''}
                </span>
              )}
              {youtubeStatus === 'invalid' && (
                <span className="invalid">✗ Invalid YouTube ID</span>
              )}
            </div>
          )}
          <div className="form-row">
            <label>
              Preacher
              <select
                onChange={(event) =>
                  setForm((prev) => ({...prev, preacher: event.target.value}))
                }
                value={form.preacher}
              >
                <option value="">-- Select --</option>
                {PREACHER_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name === OTHER_PREACHER ? 'Other (type below)' : name}
                  </option>
                ))}
              </select>
            </label>
            {form.preacher === OTHER_PREACHER && (
              <Textbox
                id="sermon-preacher-other"
                label="Preacher name"
                onChange={(value) =>
                  setForm((prev) => ({...prev, preacherOther: value}))
                }
                value={form.preacherOther}
              />
            )}
          </div>
          <div className="form-row">
            <Textbox
              id="sermon-title"
              label="Title"
              onChange={(value) => setForm((prev) => ({...prev, title: value}))}
              value={form.title}
            />
            <Textbox
              id="sermon-scripture"
              label="Scripture"
              onChange={(value) =>
                setForm((prev) => ({...prev, scripture: value}))
              }
              value={form.scripture}
            />
            <label>
              Bible Version
              <select
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    bible_version: event.target.value,
                  }))
                }
                value={form.bible_version}
              >
                {BIBLE_VERSION_OPTIONS.map((version) => (
                  <option key={version} value={version}>
                    {version || '-- None --'}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-actions">
            <Button type="submit">{editingId ? 'Save' : 'Add'}</Button>
            {editingId && (
              <Button onClick={() => handleDelete(editingId)} type="button">
                Delete
              </Button>
            )}
            <Button onClick={startNew} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </StyledSermonAdmin>
  );
}

export default SermonAdmin;
