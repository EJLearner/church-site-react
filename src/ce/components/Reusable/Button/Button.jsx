import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {COLORS} from '../../../../utils/styleVariables';

const STYLES = {
  OVAL: 'OVAL',
  RECT: 'RECT'
};

const StyledButton = styled.button`
  box-shadow: none;
  min-width: 80px;
  min-height: 30px;
  color: black;

  &.oval-button {
    background-color: orange;
    border: none;
    border-radius: 15px;
  }

  &.rect-button {
    background-color: orange;
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
      disable,
      onClick,
      children,
      buttonShape,
      name,
      value,
      type
    } = this.props;

    const computedClassName = [
      buttonShape === STYLES.RECT ? 'rect-button' : 'oval-button',
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
  buttonShape: STYLES.OVAL,
  disable: false
};

Button.propTypes = {
  buttonShape: PropTypes.oneOf(Object.values(STYLES)),
  children: PropTypes.node,
  className: PropTypes.string,
  disable: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export {STYLES};
export default Button;
