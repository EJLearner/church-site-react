import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: 14px;
  display: block;
  margin-bottom: 0.5em;
`;

function InputLabel(props) {
  return (
    <LabelStyle htmlFor={props.htmlFor} id={props.id}>
      {props.children}
      {props.required && '*'}
    </LabelStyle>
  );
}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool
};

export default InputLabel;
