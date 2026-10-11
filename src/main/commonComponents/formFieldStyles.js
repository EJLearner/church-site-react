import {css} from 'styled-components';

export const ERROR_COLOR = 'rgb(176, 0, 32)';

// Shared look for the text, date and select inputs used by the newer form
// components (TextField, Name, Address, DatePicker)
export const fieldInputStyles = css`
  input:not([type='checkbox'], [type='radio']),
  select {
    background-color: white;
    border: 1px solid rgb(118, 118, 118);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--text-on-light-background);
    font-family: inherit;
    font-size: 16px;
    min-height: 40px;
    padding: 6px 10px;
    width: 100%;

    &::placeholder {
      color: rgb(118, 118, 118);
    }

    &:focus {
      border-color: var(--application-blue);
      outline: 2px solid var(--application-blue);
      outline-offset: 0;
    }

    &[aria-invalid='true'] {
      border-color: ${ERROR_COLOR};
    }
  }
`;

// Removes the browser's default fieldset box so a group of inputs lines up
// with single inputs
export const fieldsetResetStyles = css`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;

  legend {
    padding: 0;
  }
`;

// Joins the ids of the elements that describe an input, skipping missing ones
export const describedBy = (...ids) => ids.filter(Boolean).join(' ') || null;
