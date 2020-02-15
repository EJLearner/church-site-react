import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    font-family: $century-gothic;
    padding: 6px;
  }
`;

const Text = props => {
  const {
    columns,
    id,
    instructions,
    label,
    onChange,
    onEnter,
    placeholder,
    required,
    rows,
    size,
    textArea,
    value
  } = props;

  const onKeyPress = event => {
    onEnter && event.key === 'Enter' && onEnter(event.target.value, id, event);
  };

  const labelId = `${id}-label`;
  const instructionsId = instructions ? `${id}-instructions` : null;
  const labelledBy = [labelId, instructionsId].filter(Boolean).join(' ');

  const inputProps = {
    'aria-labelledby': labelledBy,
    cols: columns,
    id,
    onChange: event => onChange(event.target.value, id, event),
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

  return (
    <TextStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <label htmlFor={id} id={labelId}>
        {label}
        {required && '*'}
      </label>
      {inputOrTextarea}
    </TextStyle>
  );
};

Text.defaultProps = {
  rows: 5
};

Text.propTypes = {
  columns: PropTypes.number,
  id: PropTypes.string,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
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
