import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputError from './InputError';
import InputLabel from './InputLabel';
import SupportText from './SupportText';
import {
  describedBy,
  fieldInputStyles,
  fieldsetResetStyles,
} from './formFieldStyles';
import stateOptions from './stateOptions';

const AddressStyle = styled.fieldset`
  ${fieldsetResetStyles}
  ${fieldInputStyles}

  .address-part {
    margin-bottom: 12px;
  }

  .city-state-zip {
    display: grid;
    gap: 0 24px;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  }

  @media (max-width: 600px) {
    .city-state-zip {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }

    .city-state-zip .address-part:first-child {
      grid-column: 1 / -1;
    }
  }

  .field-error {
    font-size: 14px;
    margin-top: 4px;
  }
`;

// Street, city, state and zip inputs grouped under one label. Each input's id
// is `${id}-${part}` (e.g. address-zip), and errors can be given per part.
const Address = (props) => {
  const {errors, id, label, onBlur, onChange, required, value} = props;

  const renderPart = (part, partLabel, autoComplete, inputProps = {}) => {
    const inputId = `${id}-${part}`;
    const errorId = `${inputId}-errors`;
    const partError = errors?.[part];
    const sharedProps = {
      'aria-describedby': describedBy(partError && errorId),
      'aria-invalid': partError ? true : undefined,
      autoComplete,
      id: inputId,
      name: inputId,
      onBlur: (event) => onBlur?.(value, id, event),
      onChange: (event) =>
        onChange({...value, [part]: event.target.value}, id, event),
      value: value?.[part] ?? '',
    };

    return (
      <div className="address-part">
        {part === 'state' ? (
          <select {...sharedProps}>
            <option value="" />
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        ) : (
          <input type="text" {...sharedProps} {...inputProps} />
        )}
        <SupportText as="label" htmlFor={inputId}>
          {partLabel}
        </SupportText>
        {partError && (
          <InputError className="field-error" id={errorId}>
            {partError}
          </InputError>
        )}
      </div>
    );
  };

  return (
    <AddressStyle className="address-field">
      <InputLabel as="legend" required={required}>
        {label}
      </InputLabel>
      {renderPart('streetLine1', 'Street Address', 'address-line1')}
      {renderPart('streetLine2', 'Street Address Line 2', 'address-line2')}
      <div className="city-state-zip">
        {renderPart('city', 'City', 'address-level2')}
        {renderPart('state', 'State', 'address-level1')}
        {renderPart('zip', 'Zip Code', 'postal-code', {inputMode: 'numeric'})}
      </div>
    </AddressStyle>
  );
};

Address.propTypes = {
  errors: PropTypes.shape({
    streetLine1: PropTypes.node,
    streetLine2: PropTypes.node,
    city: PropTypes.node,
    state: PropTypes.node,
    zip: PropTypes.node,
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.object.isRequired,
};

export default Address;
