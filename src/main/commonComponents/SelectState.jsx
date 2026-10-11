import PropTypes from 'prop-types';

import Select from './Select';
import stateOptions from './stateOptions';

function SelectState({id, onChange, value}) {
  return (
    <Select
      id={id}
      label="State"
      onChange={onChange}
      options={stateOptions.map((value) => ({label: value, value}))}
      value={value}
    />
  );
}

SelectState.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default SelectState;
