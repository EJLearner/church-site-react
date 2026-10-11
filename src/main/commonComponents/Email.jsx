import PropTypes from 'prop-types';

import TextField from './TextField';

const Email = ({supportText = 'example@example.com', ...props}) => (
  <TextField
    inputMode="email"
    supportText={supportText}
    type="email"
    {...props}
  />
);

Email.propTypes = {
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

export default Email;
