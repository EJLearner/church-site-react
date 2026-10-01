import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const GenericInputStyle = styled.div``;

function GenericInput(props) {
  const {
    errors,
    id,
    instructions,
    label,
    name,
    onBlur,
    onChange,
    onEnter,
    placeholder,
    required,
    size,
    type,
    value,
  } = props;

  return (
    <input
      id={id}
      name={name || id}
      onBlur={(event) => onBlur?.(value, id, event)}
      onChange={(event) =>
        onChange({...value, first: event.target.value}, id, event)
      }
      onKeyDown={() => {}}
      placeholder={placeholder}
      size={size}
      type={type}
      value={value ?? ''}
    />
  );
}

GenericInput.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.object.isRequired,
};

const NameStyle = styled.div`
  display: inline-block;
  margin: 1em 16px 0.5em 0;

  .text-box-pattern {
    display: inline-block;
    margin: 0.5em 0;
  }

  .text-box-pattern label {
    display: block;
  }
`;

const Name = (props) => {
  const {
    errors,
    id,
    instructions,
    label,
    name,
    onBlur,
    onChange,
    onEnter,
    placeholder,
    required,
    size,
    type,
    value,
  } = props;

  const onKeyDown = (event) => {
    if (onEnter && event.key === 'Enter') {
      onEnter(event.target.value, id, event);
    }
  };

  const {first, last} = value;

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const instructionsId = `${id}-instructions`;

  const labelledBy = [
    errors && errorsId,
    labelId,
    instructions && instructionsId,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <NameStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <InputLabel htmlFor={id} id={labelId} required={required}>
        {label}
      </InputLabel>
      {errors && <div id={errorsId}>{errors}</div>}
      <input
        aria-labelledby={labelledBy}
        id={id}
        name={name || id}
        onBlur={(event) => onBlur?.(value, id, event)}
        onChange={(event) =>
          onChange({...value, first: event.target.value}, id, event)
        }
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        size={size}
        type={type}
        value={first ?? ''}
      />{' '}
      <input
        aria-labelledby={labelledBy}
        id={id}
        name={name || id}
        onBlur={(event) => onBlur?.(value, id, event)}
        onChange={(event) =>
          onChange({...value, last: event.target.value}, id, event)
        }
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        size={size}
        type={type}
        value={last ?? ''}
      />
    </NameStyle>
  );
};

Name.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node,
  label: PropTypes.string.isRequired,
  name: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.object.isRequired,
};

export default Name;
