import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import PlainButton from '../commonComponents/PlainButton';

const StyledVisibleIcon = styled(PlainButton)`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_SECONDARY};
  visibility: ${props => (props.show ? null : 'hidden')};
  margin: 1em;
`;

function ContentSelectArrow({onClick, type, show}) {
  const icon = type === 'left' ? faAngleLeft : faAngleRight;

  return (
    <StyledVisibleIcon onClick={onClick} show={show}>
      <FontAwesomeIcon fixedWidth icon={icon} size="4x" />
    </StyledVisibleIcon>
  );
}

ContentSelectArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['left', 'right']).isRequired
};

export default ContentSelectArrow;
