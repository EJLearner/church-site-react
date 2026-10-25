import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {useEditor, useEditorState, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {Markdown} from 'tiptap-markdown';

import authFetch, {requireOk} from '../../utils/adminApi';
import Button from '../commonComponents/Button/Button';
import InputLabel from '../commonComponents/InputLabel';
import {fieldInputStyles} from '../commonComponents/formFieldStyles';

import StatusMessage from './StatusMessage';

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

// "2026-10-25" → "October 25, 2026"
function formatSunday(sunday) {
  return new Date(`${sunday}T00:00:00`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const StyledMeditationAdmin = styled.div`
  max-width: 800px;

  .week-nav {
    ${fieldInputStyles}
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-bottom: 1.5em;

    .week-select {
      max-width: 280px;
    }

    .week-status {
      color: var(--charcoal-grey);
      font-size: 14px;
      padding-bottom: 10px;
    }
  }

  .editor-field {
    margin-bottom: 1.5em;
  }

  .editor-label {
    display: block;
    font-size: 14px;
    margin-bottom: 0.5em;
  }

  .tiptap-wrapper {
    background-color: white;
    border: 1px solid rgb(118, 118, 118);
    border-radius: 4px;

    &:focus-within {
      border-color: var(--application-blue);
      outline: 2px solid var(--application-blue);
    }

    .tiptap {
      outline: none;
      padding: 0.5em 0.75em;

      p {
        margin: 0 0 0.75em;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &.subtitle-editor .tiptap {
      min-height: 1.5em;
    }

    &.content-editor .tiptap {
      min-height: 300px;
    }
  }

  .toolbar {
    background-color: var(--light-background);
    border-bottom: 1px solid rgb(118, 118, 118);
    border-radius: 4px 4px 0 0;
    display: flex;
    gap: 0.25em;
    padding: 0.25em;

    button {
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--serif);
      font-size: 16px;
      height: 32px;
      width: 32px;

      &:hover {
        border-color: rgb(118, 118, 118);
      }

      &[aria-pressed='true'] {
        background-color: var(--charcoal-grey);
        color: white;
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 0.5em;
  }
`;

function TiptapToolbar({editor}) {
  const active = useEditorState({
    editor,
    selector: (context) => ({
      bold: context.editor?.isActive('bold') ?? false,
      italic: context.editor?.isActive('italic') ?? false,
    }),
  });
  if (!editor) return null;
  return (
    <div aria-label="Formatting" className="toolbar" role="toolbar">
      <button
        aria-label="Bold"
        aria-pressed={active.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        aria-label="Italic"
        aria-pressed={active.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        <em>I</em>
      </button>
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
  const [status, setStatus] = useState(null);

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

  const loadMeditation = useCallback(
    async (sunday) => {
      try {
        const res = await requireOk(
          await authFetch(`/api/weekly-meditation/${sunday}`),
        );
        const data = await res.json();
        setExistingId(data?.id ?? null);
        subtitleEditor?.commands.setContent(data?.subtitle ?? '');
        contentEditor?.commands.setContent(data?.content ?? '');
      } catch (err) {
        setStatus({type: 'error', text: err.message});
      }
    },
    [subtitleEditor, contentEditor],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async API fetch
    loadMeditation(selectedSunday);
  }, [selectedSunday, loadMeditation]);

  function changeWeek(sunday) {
    setStatus(null);
    setSelectedSunday(sunday);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    const subtitle = subtitleEditor.storage.markdown.getMarkdown().trim();
    const content = contentEditor.storage.markdown.getMarkdown();
    const body = {
      week_start_date: selectedSunday,
      subtitle: subtitle || null,
      content,
    };
    try {
      if (existingId) {
        await requireOk(
          await authFetch(`/api/weekly-meditation/${selectedSunday}`, {
            method: 'PUT',
            body: JSON.stringify(body),
          }),
        );
      } else {
        await requireOk(
          await authFetch('/api/weekly-meditation', {
            method: 'POST',
            body: JSON.stringify(body),
          }),
        );
      }
      await loadMeditation(selectedSunday);
      setStatus({
        type: 'success',
        text: `Meditation for ${formatSunday(selectedSunday)} saved.`,
      });
    } catch (err) {
      setStatus({type: 'error', text: err.message});
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this meditation?')) return;
    setStatus(null);
    try {
      await requireOk(
        await authFetch(`/api/weekly-meditation/${selectedSunday}`, {
          method: 'DELETE',
        }),
      );
      await loadMeditation(selectedSunday);
      setStatus({
        type: 'success',
        text: `Meditation for ${formatSunday(selectedSunday)} deleted.`,
      });
    } catch (err) {
      setStatus({type: 'error', text: err.message});
    }
  }

  return (
    <StyledMeditationAdmin>
      <h2>Weekly Meditation</h2>
      <div className="week-nav">
        <div className="week-select">
          <InputLabel htmlFor="meditation-week">Week of</InputLabel>
          <select
            id="meditation-week"
            onChange={(event) => changeWeek(event.target.value)}
            value={selectedSunday}
          >
            {sundays.map((sunday) => (
              <option key={sunday} value={sunday}>
                {formatSunday(sunday)}
              </option>
            ))}
          </select>
        </div>
        <span className="week-status">
          {existingId ? 'Editing saved meditation' : 'No meditation yet'}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="editor-field">
          <span className="editor-label" id="meditation-subtitle-label">
            Subtitle
          </span>
          <div className="tiptap-wrapper subtitle-editor">
            <TiptapToolbar editor={subtitleEditor} />
            <EditorContent
              aria-labelledby="meditation-subtitle-label"
              editor={subtitleEditor}
            />
          </div>
        </div>

        <div className="editor-field">
          <span className="editor-label" id="meditation-content-label">
            Content
          </span>
          <div className="tiptap-wrapper content-editor">
            <TiptapToolbar editor={contentEditor} />
            <EditorContent
              aria-labelledby="meditation-content-label"
              editor={contentEditor}
            />
          </div>
        </div>

        <StatusMessage status={status} />

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
