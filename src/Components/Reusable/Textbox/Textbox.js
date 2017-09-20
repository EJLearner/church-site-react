import React from 'react';

import './Textbox.css';

const Textbox = props => {
  const _onChange = event => {
    props.onChange(event.target.value, props.id, event);
  };

  const labelId = `${props.id}-label`;

  return (
    <div className="text-box-pattern">
      <label htmlFor={props.id} id={labelId}>
        {props.label}
        {props.required ? '*' : undefined}
      </label>

      <input
        aria-labelledby={labelId}
        id={props.id}
        onChange={_onChange}
        size={props.size}
        value={props.value}
      />
    </div>
  );
};

export default Textbox;
