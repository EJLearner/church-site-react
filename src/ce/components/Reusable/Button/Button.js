import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const STYLES = {
  OVAL: 'OVAL',
  RECT: 'RECT'
};

class Button extends Component {
  render() {
    const {className, onClick, children, buttonShape} = this.props;

    let computedClassName =
      buttonShape === STYLES.RECT ? 'rect-button' : 'oval-button';

    if (className) {
      computedClassName += ` ${className}`;
    }

    return (
      <button className={computedClassName} onClick={onClick}>
        {children}
      </button>
    );
  }
}

Button.defaultProps = {
  buttonShape: STYLES.OVAL
};

Button.propTypes = {
  buttonShape: PropTypes.oneOf(Object.keys(STYLES).map(key => STYLES[key])),
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

Button.STYLES = STYLES;

export default Button;
