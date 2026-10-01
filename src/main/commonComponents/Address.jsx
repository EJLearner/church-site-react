import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const AddressStyle = styled.div`
  display: block;
  margin: 1em 16px 0.5em 0;

  .text-box-pattern {
    display: inline-block;
    margin: 0.5em 0;
  }

  .text-box-pattern label {
    display: block;
  }
`;

function SupportText({text}) {
  return <p>{text}</p>;
}

SupportText.propTypes = {
  text: PropTypes.string.isRequired,
};

const Address = (props) => {
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

  const {streetLine1, streetLine2, city, state, zip} = value;

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

  // TODO: Make sure autofill works right, right now, it's putting it on the line below, probably because the support text
  // looks like it's associated with the field that it's above, not below.

  return (
    <AddressStyle className="text-box-pattern">
      {instructions && <p id={instructionsId}>{instructions}</p>}
      <InputLabel htmlFor={id} id={labelId} required={required}>
        {label}
      </InputLabel>
      {errors && <div id={errorsId}>{errors}</div>}
      <div>
        <input
          aria-labelledby={labelledBy}
          id={id}
          name={name || id}
          onBlur={(event) => onBlur?.(value, id, event)}
          onChange={(event) =>
            onChange({...value, streetLine1: event.target.value}, id, event)
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          type={type}
          value={streetLine1 ?? ''}
        />
        <SupportText text="Street Address" />
      </div>
      <div>
        <input
          aria-labelledby={labelledBy}
          id={id}
          name={name || id}
          onBlur={(event) => onBlur?.(value, id, event)}
          onChange={(event) =>
            onChange({...value, streetLine2: event.target.value}, id, event)
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          type={type}
          value={streetLine2 ?? ''}
        />
        <SupportText text="Street Address Line 2" />
      </div>
      <div>
        <input
          aria-labelledby={labelledBy}
          id={id}
          name={name || id}
          onBlur={(event) => onBlur?.(value, id, event)}
          onChange={(event) =>
            onChange({...value, city: event.target.value}, id, event)
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          type={type}
          value={city ?? ''}
        />
        <SupportText text="City" />
        <input
          aria-labelledby={labelledBy}
          id={id}
          name={name || id}
          onBlur={(event) => onBlur?.(value, id, event)}
          onChange={(event) =>
            onChange({...value, state: event.target.value}, id, event)
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          type={type}
          value={state ?? ''}
        />
        <SupportText text="State" />
      </div>
      <div>
        <input
          aria-labelledby={labelledBy}
          id={id}
          name={name || id}
          onBlur={(event) => onBlur?.(value, id, event)}
          onChange={(event) =>
            onChange({...value, zip: event.target.value}, id, event)
          }
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          type={type}
          value={zip ?? ''}
        />
        <SupportText text="Postal / Zip Code" />
      </div>
    </AddressStyle>
  );
};

Address.propTypes = {
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

export default Address;
