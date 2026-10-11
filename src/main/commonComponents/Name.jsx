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

const NameStyle = styled.fieldset`
  ${fieldsetResetStyles}
  ${fieldInputStyles}

  .name-parts {
    display: grid;
    gap: 8px 24px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .field-error {
    font-size: 14px;
    margin-top: 4px;
  }
`;

const PARTS = [
  {part: 'first', label: 'First Name', autoComplete: 'given-name'},
  {part: 'last', label: 'Last Name', autoComplete: 'family-name'},
];

// First and last name inputs grouped under one label. Each input's id is
// `${id}-first` / `${id}-last`, and errors can be given per part.
const Name = (props) => {
  const {autoComplete, errors, id, label, onBlur, onChange, required, value} =
    props;

  return (
    <NameStyle className="name-field">
      <InputLabel as="legend" required={required}>
        {label}
      </InputLabel>
      <div className="name-parts">
        {PARTS.map(
          ({part, label: partLabel, autoComplete: partAutoComplete}) => {
            const inputId = `${id}-${part}`;
            const errorId = `${inputId}-errors`;
            const partError = errors?.[part];

            return (
              <div key={part}>
                <input
                  aria-describedby={describedBy(partError && errorId)}
                  aria-invalid={partError ? true : undefined}
                  aria-required={required || undefined}
                  autoComplete={autoComplete ? partAutoComplete : undefined}
                  id={inputId}
                  name={inputId}
                  onBlur={(event) => onBlur?.(value, id, event)}
                  onChange={(event) =>
                    onChange({...value, [part]: event.target.value}, id, event)
                  }
                  type="text"
                  value={value?.[part] ?? ''}
                />
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
          },
        )}
      </div>
    </NameStyle>
  );
};

Name.propTypes = {
  // Adds browser autofill hints; only use for the person filling in the form
  autoComplete: PropTypes.bool,
  errors: PropTypes.shape({first: PropTypes.node, last: PropTypes.node}),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.shape({first: PropTypes.string, last: PropTypes.string})
    .isRequired,
};

export default Name;
