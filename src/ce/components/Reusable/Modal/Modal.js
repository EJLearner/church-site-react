import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    this._modal.focus();
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'auto';
  }

  _renderCloseButton() {
    return (
      <i
        className="close-icon fa fa-2x fa-times-circle"
        onClick={this.props.onCloseClick}
        tabIndex="0"
        title="Close Button"
      />
    );
  }
  render() {
    return (
      <div>
        <div className="modal-overlay" />
        <div className="modal-box">
          <div
            className="modal-content"
            ref={node => (this._modal = node)}
            tabIndex="0"
          >
            {this.props.children}
          </div>
          {this._renderCloseButton()}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseClick: PropTypes.func.isRequired
};

export default Modal;
