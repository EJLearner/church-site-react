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
    const modalContentClass = [this.props.className, 'modal-content'].join(' ');

    return (
      <div>
        <div className="modal-overlay" />
        <div className="modal-box">
          <div
            className={modalContentClass}
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
  // will be used on the div surrounding the content box
  className: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired
};

export default Modal;
