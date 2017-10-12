import React from 'react';

import './Text.css';

const Text = props => {
  const _onChange = event => {
    props.onChange(event.target.value, props.id, event);
  };

  const labelId = `${props.id}-label`;

  const input = (
    <input
      aria-labelledby={labelId}
      id={props.id}
      onChange={_onChange}
      size={props.size}
      value={props.value}
    />
  );

  const textArea = (
    <textarea
      aria-labelledby={labelId}
      id={props.id}
      onChange={_onChange}
      size={props.size}
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

export default Text;
