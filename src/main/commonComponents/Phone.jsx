import PropTypes from 'prop-types';

import TextField from './TextField';

const Phone = ({supportText = '10-digit phone number', ...props}) => (
  <TextField
    inputMode="tel"
    placeholder="(000) 000-0000"
    supportText={supportText}
    type="tel"
    {...props}
  />
);

Phone.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  supportText: PropTypes.node,
  value: PropTypes.string,
};

export default Phone;
