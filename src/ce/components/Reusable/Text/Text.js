import React from 'react';
import PropTypes from 'prop-types';

import './Text.css';

const Text = props => {
  const _onChange = event => {
    props.onChange(event.target.value, props.id, event);
  };

  const _onKeyPress = event => {
    const {id, onEnter} = props;

    if (onEnter && event.key === 'Enter') {
      onEnter(event.target.value, id, event);
    }
  };

  const labelId = `${props.id}-label`;

  const input = (
    <input
      aria-labelledby={labelId}
      id={props.id}
      onChange={_onChange}
      onKeyPress={_onKeyPress}
      placeholder={props.placeholder}
      size={props.size}
      value={props.value}
    />
  );

  const textArea = (
    <textarea
      aria-labelledby={labelId}
      cols={props.columns}
      id={props.id}
      onChange={_onChange}
      onKeyPress={_onKeyPress}
      placeholder={props.placeholder}
      rows={props.rows}
      value={props.value}
    />
  );

  const inputOrTextarea = props.textArea ? textArea : input;

  return (
    <div className="text-box-pattern">
      <label htmlFor={props.id} id={labelId}>
        {props.label}
        {props.required ? '*' : undefined}
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
