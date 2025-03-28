import PropTypes from 'prop-types';
import {Component} from 'react';
import styled from 'styled-components';

import {COLORS, LOGICAL_COLORS} from '../../../utils/styleVariables';

const SHAPES = {
  OVAL: 'OVAL',
  RECT: 'RECT',
};

const BUTTON_COLORS = {
  BLACK: 'BLACK',
  GRAY: 'GRAY',
  ORANGE: 'ORANGE',
};

const StyledButton = styled.button`
  border: none;
  box-shadow: none;
  min-width: 80px;
  min-height: 30px;
  color: ${LOGICAL_COLORS.STANDARD_TEXT};
  transition: all 0.05s;

  margin-left: 1em;

  &:first-child {
    margin-left: 0;
  }

  &.orange-button {
    background-color: orange;
  }

  &.gray-button {
    background-color: gray;
  }

  &.black-button {
    background-color: ${COLORS.BLACK};
    color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};
  }

  &.oval-button {
    border-radius: 15px;
  }

  &.disabled {
    background-color: ${COLORS.GRAY180};
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);

    @media (prefers-reduced-motion) {
      transform: none;
      filter: brightness(0.9);
    }
  }
`;

function getColorStyle(color) {
  switch (color) {
    case BUTTON_COLORS.GRAY:
      return 'gray-button';
    case BUTTON_COLORS.BLACK:
      return 'black-button';
    default:
      return 'orange-button';
  }
}

class Button extends Component {
  render() {
    const {
      className,
      color,
      disable,
      onClick,
      children,
      buttonShape,
      name,
      value,
      type,
    } = this.props;

    const colorStyle = getColorStyle(color);

    const computedClassName = [
      buttonShape === SHAPES.RECT ? 'rect-button' : 'oval-button',
      colorStyle,
      className,
      disable && 'disabled',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <StyledButton
        className={computedClassName}
        name={name}
        onClick={onClick}
        type={type}
        value={value}
      >
        {children}
      </StyledButton>
    );
  }
}

Button.defaultProps = {
  buttonShape: SHAPES.OVAL,
  color: BUTTON_COLORS.ORANGE,
  disable: false,
};

Button.propTypes = {
  buttonShape: PropTypes.oneOf(Object.values(SHAPES)),
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(BUTTON_COLORS)),
  disable: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Button.SHAPES = SHAPES;
Button.BUTTON_COLORS = BUTTON_COLORS;

export default Button;
