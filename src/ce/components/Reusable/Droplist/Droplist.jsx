import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const DroplistStyle = styled.div`
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
  return options.map(option => {
    const {label, value} = option;

    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });
}

const Droplist = ({onChange, id, options, value, label}) => {
  return (
    <DroplistStyle className="select-outer-div">
      {label && <div>{label}</div>}
      <select
        id={id}
        name={id}
        onChange={event => onChange(event.target.value, id, event)}
        value={value}
      >
        {renderedOptions(options)}
      </select>
    </DroplistStyle>
  );
};

Droplist.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string
};

export default Droplist;
