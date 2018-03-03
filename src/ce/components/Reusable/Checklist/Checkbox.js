import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './Checkbox.css';

const Checkbox = props => {
  const _onChange = event => {
    props.onChange(event.target.checked, props.id, event);
  };

  const labelId = `${props.id}-label`;

  const computedAriaLabelledBy = props.ariaLabelledBy
    ? `${props.ariaLabelledBy} ${labelId}`
    : labelId;

  const computedClassName = classNames('checkbox-pattern', props.className);

  return (
    <div className={computedClassName}>
      <input
        aria-labelledby={computedAriaLabelledBy}
        checked={props.checked}
        id={props.id}
        onChange={_onChange}
        type="checkbox"
        value={props.value}
      />
      <label htmlFor={props.id} id={labelId}>
        {props.label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  ariaLabelledBy: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Checkbox;
