import PropTypes from 'prop-types';
import React from 'react';

const HiddenInput = ({name, value}) => {
  return <input name={name} type="hidden" value={value} />;
};

HiddenInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default HiddenInput;
