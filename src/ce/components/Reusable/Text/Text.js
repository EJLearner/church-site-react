import React from 'react';
import PropTypes from 'prop-types';

import './Text.css';

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

  const _onChange = event => {
    onChange(event.target.value, id, event);
  };

  const _onKeyPress = event => {
    if (onEnter && event.key === 'Enter') {
      onEnter(event.target.value, id, event);
    }
  };

  const labelId = `${id}-label`;
  const instructionsId = instructions ? `${id}-instructions` : null;
  const labelledBy = [labelId, instructionsId].filter(id => id).join(' ');

  const inputProps = {
    'aria-labelledby': labelledBy,
    cols: columns,
    id: id,
    onChange: _onChange,
    onKeyPress: _onKeyPress,
    placeholder: placeholder,
    rows: rows,
    size: size,
    value: value
  };

  const inputOrTextarea = textArea ? (
    <textarea {...inputProps} />
  ) : (
    <input {...inputProps} />
  );

  return (
    <div className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <label htmlFor={id} id={labelId}>
        {label}
        {required && '*'}
      </label>
      {inputOrTextarea}
    </div>
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
