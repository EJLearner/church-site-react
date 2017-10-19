import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.css';

class Button extends Component {
  render() {
    return (
      <button className="button-component" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired
};

export default Button;
