import PropTypes from 'prop-types';

import InputLabel from './InputLabel';

function DatePicker(props) {
  const {label, value, id, required, onBlur, onChange} = props;

  const labelId = `${id}-label`;

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
  value: PropTypes.string.isRequired,
};

export default DatePicker;
