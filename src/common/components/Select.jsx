import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const SelectStyle = styled.div`
  display: inline-block;
  margin-right: 2em;

  select {
    border-radius: 5px;
    box-shadow: 2px 2px 2px 0 #c2c2c2;
    font-size: 14px;
    padding: 0.2em;
  }
`;

function renderedOptions(options) {
  return options.map((option) => {
    const {label, value} = option;

    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });
}

const Select = ({onChange, id, labelSameLine, options, value, label}) => {
  return (
    <SelectStyle className="select-outer-div">
      {label && <InputLabel inline={labelSameLine}>{label}</InputLabel>}
      <select
        id={id}
        name={id}
        onChange={(event) => onChange(event.target.value, id, event)}
        value={value}
      >
        {renderedOptions(options)}
      </select>
    </SelectStyle>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  labelSameLine: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired
};

export default Select;
