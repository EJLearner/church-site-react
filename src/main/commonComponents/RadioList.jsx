import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputError from './InputError';
import InputLabel from './InputLabel';
import {describedBy, fieldsetResetStyles} from './formFieldStyles';

const RadioListStyle = styled.fieldset`
  ${fieldsetResetStyles}

  /* Floating the legend lets the options sit on the same line as it */
  legend {
    float: left;
    margin: 0 24px 0 0;
    line-height: 32px;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 0 24px;
  }

  .option {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    gap: 8px;
    min-height: 32px;
  }

  input {
    height: 18px;
    margin: 0;
    width: 18px;
  }

  .field-error {
    clear: left;
    font-size: 14px;
    margin-top: 4px;
  }
`;

// Radio buttons grouped under one label. Each button's id is
// `${id}-${optionValue}`.
function RadioList(props) {
  const {errors, id, label, onChange, options, required, value} = props;

  const errorsId = `${id}-errors`;

  return (
    <RadioListStyle
      aria-describedby={describedBy(errors && errorsId)}
      aria-invalid={errors ? true : undefined}
      aria-required={required || undefined}
      className="radio-list"
      role="radiogroup"
    >
      {label && (
        <InputLabel as="legend" required={required}>
          {label}
        </InputLabel>
      )}
      <div className="options">
        {options.map(({label: optionLabel, value: optionValue}) => (
          <label className="option" key={optionValue}>
            <input
              checked={value === optionValue}
              id={`${id}-${optionValue}`}
              name={id}
              onChange={(event) => onChange(event.target.value, id, event)}
              type="radio"
              value={optionValue}
            />
            {optionLabel}
          </label>
        ))}
      </div>
      {errors && (
        <InputError className="field-error" id={errorsId}>
          {errors}
        </InputError>
      )}
    </RadioListStyle>
  );
}

RadioList.propTypes = {
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default RadioList;
