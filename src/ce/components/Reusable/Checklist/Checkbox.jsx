import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.css';

const Checkbox = (props) => {
  const _onChange = (event) => {
    props.onChange(event.target.checked, props.id, event);
  };

  const labelId = `${props.id}-label`;

  const computedAriaLabelledBy = props.ariaLabelledBy
    ? `${props.ariaLabelledBy} ${labelId}`
    : labelId;

  const computedClassName = [
    'checkbox-pattern',
    props.inline && 'inline',
    props.className
  ]
    .filter((name) => name)
    .join(' ');

  return (
    <div className={computedClassName}>
      <input
        aria-labelledby={computedAriaLabelledBy}
        checked={props.checked}
        id={props.id}
        onChange={_onChange}
        type="checkbox"
        value={props.value || props.id}
      />
      <label htmlFor={props.id} id={labelId}>
        {props.label}
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  inline: false
};

Checkbox.propTypes = {
  ariaLabelledBy: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default Checkbox;
