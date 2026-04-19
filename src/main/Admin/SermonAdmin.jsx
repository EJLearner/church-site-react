import {useState, useEffect} from 'react';
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

const TITLE_PREFIXES = ['rev.', 'dr.', 'minister'];

function detectPreacher(videoTitle) {
  const titleLower = videoTitle.toLowerCase();
  for (const name of Object.values(constants.PREACHERS)) {
    const firstName = name
      .split(' ')
      .find((word) => !TITLE_PREFIXES.includes(word.toLowerCase()))
      ?.toLowerCase();
    if (firstName && titleLower.includes(firstName)) {
      return name;
    }
  }
  return '';
}

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

  .youtube-row {
    display: flex;
    align-items: flex-end;
    gap: 1em;
    margin-bottom: 0.5em;

    > :first-child {
      flex: 1;
    }

    .youtube-selected {
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.25em;
      }

      a {
        color: var(--text-on-light-background);
      }
    }
  }

  .channel-picker {
    border: 1px solid var(--charcoal-grey);
    padding: 1em;
    margin-bottom: 1em;

    .picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75em;

      h4 {
        margin: 0;
      }
    }

    .picker-loading {
      color: var(--charcoal-grey);
    }

    .picker-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 0.75em;
    }

    .picker-video {
      cursor: pointer;
      border: 2px solid transparent;
      padding: 0.25em;

      &:hover {
        border-color: var(--maroon);
      }

      img {
        width: 100%;
        display: block;
      }

      .picker-title {
        font-size: 12px;
        margin-top: 0.25em;
      }

      .picker-date {
        font-size: 11px;
        color: var(--charcoal-grey);
      }
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
  const [channelVideos, setChannelVideos] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(true);

  function selectChannelVideo(video) {
    setForm((prev) => ({
      ...prev,
      youtube_id: video.videoId,
      title: prev.title || video.title,
      preacher: prev.preacher || detectPreacher(video.title),
    }));
    setPickerVisible(false);
  }

  function clearYoutubeId() {
    setForm((prev) => ({...prev, youtube_id: ''}));
    setPickerVisible(true);
  }

  async function loadSermons() {
    const res = await authFetch('/api/sermons/all');
    const data = await res.json();
    setSermons(data);
  }

  async function loadChannelVideos(reload = false) {
    setChannelVideos(null);
    setPickerVisible(true);
    try {
      const url = reload
        ? '/api/youtube-feed?reload=true'
        : '/api/youtube-feed';
      const res = await authFetch(url);
      const data = await res.json();
      setChannelVideos(data);
    } catch {
      setChannelVideos([]);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async API fetch
    loadSermons();
    loadChannelVideos();
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
          </div>
          <div className="youtube-row">
            {form.youtube_id ? (
              <div className="youtube-selected">
                <label>YouTube Video</label>
                <div>
                  <a
                    href={`https://www.youtube.com/watch?v=${form.youtube_id}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {`https://www.youtube.com/watch?v=${form.youtube_id}`}
                  </a>
                </div>
              </div>
            ) : (
              <Textbox
                id="sermon-youtube-id"
                label="YouTube ID"
                onChange={(value) =>
                  setForm((prev) => ({...prev, youtube_id: value}))
                }
                value={form.youtube_id}
              />
            )}
            {form.youtube_id ? (
              <Button onClick={clearYoutubeId} type="button">
                Change
              </Button>
            ) : (
              !pickerVisible &&
              channelVideos?.length > 0 && (
                <Button onClick={() => setPickerVisible(true)} type="button">
                  Show recent videos
                </Button>
              )
            )}
          </div>
          {channelVideos === null && (
            <div className="channel-picker">
              <span className="picker-loading">Loading channel videos...</span>
            </div>
          )}
          {channelVideos !== null && pickerVisible && (
            <div className="channel-picker">
              {channelVideos.length === 0 ? (
                <span className="picker-loading">
                  Automatic video retrieval not working (RSS feed down)
                </span>
              ) : (
                <>
                  <div className="picker-header">
                    <h4>Select a video</h4>
                    <Button
                      onClick={() => loadChannelVideos(true)}
                      type="button"
                    >
                      Reload latest videos
                    </Button>
                  </div>
                  <div className="picker-grid">
                    {channelVideos.map((video) => (
                      <div
                        className="picker-video"
                        key={video.videoId}
                        onClick={() => selectChannelVideo(video)}
                      >
                        {video.thumbnail && (
                          <img alt={video.title} src={video.thumbnail} />
                        )}
                        <div className="picker-title">{video.title}</div>
                        <div className="picker-date">
                          {video.published
                            ? new Date(video.published).toLocaleDateString()
                            : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
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
