import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';
import PlainButton from '../commonComponents/PlainButton';
import constants from '../../utils/constants';

const {SLENDER_ARROW_LEFT, SLENDER_ARROW_RIGHT} = constants;

const StyledVisibleIcon = styled(PlainButton)`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_SECONDARY};
  visibility: ${props => (props.show ? null : 'hidden')};

  &:hover {
    color: ${LOGICAL_COLORS.CT_LIGHTENED_ACCENT};
  }

  span {
    font-size: 64px;
  }
`;

function ContentSelectArrow({onClick, type, show}) {
  const icon = type === 'left' ? SLENDER_ARROW_LEFT : SLENDER_ARROW_RIGHT;

  return (
    <StyledVisibleIcon onClick={onClick} show={show}>
      <span>{icon}</span>
    </StyledVisibleIcon>
  );
}

ContentSelectArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['left', 'right']).isRequired
};

export default ContentSelectArrow;
