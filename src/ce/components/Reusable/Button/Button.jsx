import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

import {COLORS} from '../../../../utils/styleVariables';

const SHAPES = {
  OVAL: 'OVAL',
  RECT: 'RECT'
};

const BUTTON_COLORS = {
  GRAY: 'GRAY',
  ORANGE: 'ORANGE'
};

const StyledButton = styled.button`
  box-shadow: none;
  min-width: 80px;
  min-height: 30px;
  color: black;

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

  &.oval-button {
    border: none;
    border-radius: 15px;
  }

  &.rect-button {
    border: none;
  }

  &.disabled {
    background-color: ${COLORS.GRAY180};
  }
`;

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
      type
    } = this.props;

    const computedClassName = [
      buttonShape === SHAPES.RECT ? 'rect-button' : 'oval-button',
      color === BUTTON_COLORS.GRAY ? 'gray-button' : 'orange-button',
      className,
      disable && 'disabled'
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
  disable: false
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
  value: PropTypes.string
};

export {SHAPES as STYLES};
export {SHAPES, BUTTON_COLORS};
export default Button;
