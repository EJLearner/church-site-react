import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Markdown} from 'tiptap-markdown';

import authFetch from '../../utils/adminApi';
import Button from '../commonComponents/Button/Button';

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

const StyledMeditationAdmin = styled.div`
  .week-nav {
    align-items: center;
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;
  }

  .editor-label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.25em;
  }

  .tiptap-wrapper {
    border: 1px solid var(--charcoal-grey);
    border-radius: 4px;
    margin-bottom: 1em;
    padding: 0.5em;

    &.subtitle-wrapper {
      min-height: 2.5em;
    }

    &.content-wrapper {
      min-height: 200px;
    }

    .tiptap {
      outline: none;
    }
  }

  .toolbar {
    border-bottom: 1px solid var(--charcoal-grey);
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
  }

  .form-actions {
    display: flex;
    gap: 0.5em;
    margin-top: 1em;
  }
`;

function TiptapToolbar({editor}) {
  if (!editor) return null;
  return (
    <div className="toolbar">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        B
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        I
      </Button>
    </div>
  );
}

TiptapToolbar.propTypes = {
  editor: PropTypes.object,
};

function MeditationAdmin() {
  const sundays = getSundays();
  const [selectedSunday, setSelectedSunday] = useState(sundays[0]);
  const [existingId, setExistingId] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const subtitleEditor = useEditor({
    extensions: [
      StarterKit.configure({bold: false, italic: false}),
      Bold,
      Italic,
      Markdown,
    ],
    content: '',
  });

  const contentEditor = useEditor({
    extensions: [StarterKit, Markdown],
    content: '',
  });

  async function loadMeditation(sunday) {
    setError(null);
    setSaved(false);
    try {
      const res = await authFetch(`/api/weekly-meditation/${sunday}`);
      const data = await res.json();
      if (data) {
        setExistingId(data.id);
        subtitleEditor?.commands.setContent(data.subtitle ?? '');
        contentEditor?.commands.setContent(data.content ?? '');
      } else {
        setExistingId(null);
        subtitleEditor?.commands.setContent('');
        contentEditor?.commands.setContent('');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async API fetch
    loadMeditation(selectedSunday);
  }, [selectedSunday]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    const subtitle = subtitleEditor.storage.markdown.getMarkdown().trim();
    const content = contentEditor.storage.markdown.getMarkdown();
    const body = {
      week_start_date: selectedSunday,
      subtitle: subtitle || null,
      content,
    };
    try {
      if (existingId) {
        await authFetch(`/api/weekly-meditation/${selectedSunday}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
      } else {
        await authFetch('/api/weekly-meditation', {
          method: 'POST',
          body: JSON.stringify(body),
        });
      }
      setSaved(true);
      await loadMeditation(selectedSunday);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this meditation?')) return;
    try {
      await authFetch(`/api/weekly-meditation/${selectedSunday}`, {
        method: 'DELETE',
      });
      await loadMeditation(selectedSunday);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <StyledMeditationAdmin>
      <h2>Weekly Meditation</h2>
      <div className="week-nav">
        <label htmlFor="meditation-week">Week of</label>
        <select
          id="meditation-week"
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
      {saved && <div style={{color: 'green'}}>Saved.</div>}

      <form onSubmit={handleSubmit}>
        <span className="editor-label">Subtitle</span>
        <div className="tiptap-wrapper subtitle-wrapper">
          <TiptapToolbar editor={subtitleEditor} />
          <EditorContent editor={subtitleEditor} />
        </div>

        <span className="editor-label">Content</span>
        <div className="tiptap-wrapper content-wrapper">
          <TiptapToolbar editor={contentEditor} />
          <EditorContent editor={contentEditor} />
        </div>

        <div className="form-actions">
          <Button type="submit">{existingId ? 'Save' : 'Create'}</Button>
          {existingId && (
            <Button onClick={handleDelete} type="button">
              Delete
            </Button>
          )}
        </div>
      </form>
    </StyledMeditationAdmin>
  );
}

export default MeditationAdmin;
