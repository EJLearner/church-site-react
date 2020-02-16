import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextboxStyle = styled.div`
  display: inline-block;
  margin: 0.5em 3em 0.5em 0;

  label {
    display: block;
  }

  input {
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 0 #c2c2c2;
    font-family: $century-gothic;
    padding: 6px;
  }
`;

const Textbox = props => {
  const {
    errors,
    id,
    instructions,
    label,
    name,
    onChange,
    onEnter,
    placeholder,
    required,
    size,
    value
  } = props;

  const onKeyPress = event => {
    onEnter && event.key === 'Enter' && onEnter(event.target.value, id, event);
  };

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const instructionsId = `${id}-instructions`;

  const labelledBy = [
    errors && errorsId,
    labelId,
    instructions && instructionsId
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TextboxStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <label htmlFor={id} id={labelId}>
        {label}
        {required && '*'}
      </label>
      {errors && <div id={errorsId}>{errors}</div>}
      <input
        aria-labelledby={labelledBy}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value, id, event)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        size={size}
        value={value}
      />
    </TextboxStyle>
  );
};

Textbox.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.string.isRequired
};

export default Textbox;
