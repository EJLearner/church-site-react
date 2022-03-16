import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {COLORS} from '../../utils/styleVariables';

const TextStyle = styled.div`
  display: inline-block;
  margin: 0.5em 3em 0.5em 0;

  label {
    display: block;
  }

  input,
  textarea {
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 0 #c2c2c2;
    font-family: var(--century-gothic);
    padding: 6px;
  }

  .char-count {
    font-size: 14px;
    color: ${COLORS.GRAY};
  }
`;

function handleChange(event, onChange, id, characterLimit) {
  const {value} = event.target;

  if (characterLimit == null || value.length <= characterLimit) {
    onChange(value, id, event);
  } else {
    alert(`You have exceeded the character limit of ${characterLimit}`);
  }
}

/**
 * Text component
 * @param {object} props - react props
 *
 * @deprecated
 */
const Text = (props) => {
  const {
    characterLimit,
    columns,
    errors,
    id,
    instructions,
    label,
    name,
    onChange,
    onEnter,
    placeholder,
    required,
    rows,
    size,
    textArea,
    value
  } = props;

  const onKeyPress = (event) => {
    onEnter && event.key === 'Enter' && onEnter(event.target.value, id, event);
  };

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const characterCountId = `${id}-character-count`;
  const instructionsId = `${id}-instructions`;

  const labelledBy = [
    errors && errorsId,
    labelId,
    instructions && instructionsId,
    characterLimit && characterCountId
  ]
    .filter(Boolean)
    .join(' ');

  const inputProps = {
    'aria-labelledby': labelledBy,
    cols: columns,
    id,
    name,
    onChange: (event) => handleChange(event, onChange, id, characterLimit),
    onKeyPress,
    placeholder,
    rows,
    size,
    value
  };

  const inputOrTextarea = textArea ? (
    <textarea {...inputProps} />
  ) : (
    <input {...inputProps} />
  );

  let characterCountRender;
  let remainingCharacters;
  if (characterLimit) {
    remainingCharacters = characterLimit - value.length;
    characterCountRender = (
      <div className="char-count" id={characterCountId}>
        Characters Remaining: {remainingCharacters}
      </div>
    );
  }

  return (
    <TextStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <label htmlFor={id} id={labelId}>
        {label}
        {required && '*'}
      </label>
      {errors && <div id={errorsId}>{errors}</div>}
      {inputOrTextarea}
      {characterCountRender}
    </TextStyle>
  );
};

Text.defaultProps = {
  rows: 5
};

Text.propTypes = {
  characterLimit: PropTypes.number,
  columns: PropTypes.number,
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  /**
   * Use textbox or textare instead
   *
   * @deprecated
   */
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.number,
  textArea: PropTypes.bool,
  value: PropTypes.string.isRequired
};

export default Text;
