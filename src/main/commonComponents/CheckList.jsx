import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputError from './InputError';
import InputLabel from './InputLabel';
import {describedBy, fieldsetResetStyles} from './formFieldStyles';

const CheckListStyle = styled.fieldset`
  ${fieldsetResetStyles}

  .option {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }

  input {
    flex-shrink: 0;
    height: 18px;
    margin: 2px 0 0;
    width: 18px;
  }

  .field-error {
    font-size: 14px;
  }
`;

// Checkboxes grouped under one label. The value is a Set of the checked
// option values. With required, every option must be checked; errors marks
// the unchecked ones as invalid.
function CheckList(props) {
  const {
    errors,
    id,
    label,
    onChange,
    options,
    required,
    value: propValue,
  } = props;

  const errorsId = `${id}-errors`;

  return (
    <CheckListStyle
      aria-describedby={describedBy(errors && errorsId)}
      className="check-list"
    >
      {label && (
        <InputLabel as="legend" required={required}>
          {label}
        </InputLabel>
      )}
      {options.map(({label: optionLabel, value: optionValue}) => (
        <label className="option" key={optionValue}>
          <input
            aria-invalid={
              errors && !propValue.has(optionValue) ? true : undefined
            }
            aria-required={required || undefined}
            checked={propValue.has(optionValue)}
            id={`${id}-${optionValue}`}
            name={id}
            onChange={(event) => {
              const newValue = new Set(propValue);
              if (newValue.has(optionValue)) {
                newValue.delete(optionValue);
              } else {
                newValue.add(optionValue);
              }

              onChange(newValue, id, event);
            }}
            type="checkbox"
            value={optionValue}
          />
          <span>{optionLabel}</span>
        </label>
      ))}
      {errors && (
        <InputError className="field-error" id={errorsId}>
          {errors}
        </InputError>
      )}
    </CheckListStyle>
  );
}

CheckList.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  required: PropTypes.bool,
  value: PropTypes.instanceOf(Set).isRequired,
};

export default CheckList;
