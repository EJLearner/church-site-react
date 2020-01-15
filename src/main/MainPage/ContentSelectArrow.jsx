import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const ArrowIcon = styled.div`
  color: ${props =>
    props.show ? LOGICAL_COLORS.CT_TEXT_ON_SECONDARY : 'transparent'};
  margin: 1em;
`;

function ContentSelectArrow({onClick, type, show}) {
  const icon = type === 'left' ? faAngleLeft : faAngleRight;

  return (
    <ArrowIcon aria-hidden={!show} onClick={show ? onClick : null} show={show}>
      <FontAwesomeIcon fixedWidth icon={icon} size="4x" />
    </ArrowIcon>
  );
}

ContentSelectArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['left', 'right']).isRequired
};

export default ContentSelectArrow;
