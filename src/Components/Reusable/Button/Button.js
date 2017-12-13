import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const STYLES = {
  OVAL: 'OVAL',
  RECT: 'RECT'
};

class Button extends Component {
  render() {
    const {className, onClick, children, style} = this.props;
    let computedClassName =
      style === STYLES.RECT ? 'rect-button' : 'oval-button';

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
  style: STYLES.OVAL
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string
};

Button.STYLES = STYLES;

export default Button;
