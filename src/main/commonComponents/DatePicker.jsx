import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const DatePickerStyle = styled.div`
  display: inline-block;
  margin: 1em 16px 0.5em 0;

  .date-picker-pattern {
    display: inline-block;
    margin: 0.5em 0;
  }

  .date-picker-pattern label {
    display: block;
  }
`;

function DatePicker(props) {
  const {label, value, id, required, onBlur, onChange} = props;

  const errorsId = `${id}-errors`;
  const labelId = `${id}-label`;
  const instructionsId = `${id}-instructions`;

  return (
    <div className="date-picker">
      <InputLabel htmlFor={id} id={labelId} required={required}>
        {label}
      </InputLabel>
      <input
        onBlur={(event) => onBlur?.(event.target.value, id, event)}
        onChange={(event) => onChange(event.target.value, id, event)}
        type="date"
        value={value}
      />
    </div>
  );
}

DatePicker.propTypes = {
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

export default DatePicker;
