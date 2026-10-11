import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputError from './InputError';
import InputLabel from './InputLabel';
import SupportText from './SupportText';
import {describedBy, fieldInputStyles} from './formFieldStyles';

const TextFieldStyle = styled.div`
  ${fieldInputStyles}

  .field-error {
    font-size: 14px;
    margin-top: 4px;
  }
`;

// Single-line input with a label above, and optional support text and error
// message below
const TextField = (props) => {
  const {
    autoComplete,
    className,
    errors,
    id,
    inputMode,
    label,
    maxLength,
    onBlur,
    onChange,
    placeholder,
    required,
    supportText,
    type = 'text',
    value,
  } = props;

  const errorsId = `${id}-errors`;
  const supportTextId = `${id}-support-text`;

  return (
    <TextFieldStyle
      className={['text-field', className].filter(Boolean).join(' ')}
    >
      <InputLabel htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <input
        aria-describedby={describedBy(
          supportText && supportTextId,
          errors && errorsId,
        )}
        aria-invalid={errors ? true : undefined}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={id}
        onBlur={(event) => onBlur?.(event.target.value, id, event)}
        onChange={(event) => onChange(event.target.value, id, event)}
        placeholder={placeholder}
        type={type}
        value={value ?? ''}
      />
      {supportText && (
        <SupportText id={supportTextId}>{supportText}</SupportText>
      )}
      {errors && (
        <InputError className="field-error" id={errorsId}>
          {errors}
        </InputError>
      )}
    </TextFieldStyle>
  );
};

TextField.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputMode: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  supportText: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
