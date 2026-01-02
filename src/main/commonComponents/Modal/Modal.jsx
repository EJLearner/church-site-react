import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {Component} from 'react';

import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    this.modal.focus();
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'auto';
  }

  render() {
    const {className, children, onCloseClick} = this.props;

    const modalContentClass = [className, 'modal-content']
      .filter(Boolean)
      .join(' ');

    return (
      <div>
        <div className="modal-overlay">
          <div className="modal-box">
            <div
              className={modalContentClass}
              ref={(node) => (this.modal = node)}
              tabIndex="0"
            >
              {children}
            </div>
            {onCloseClick && (
              <FontAwesomeIcon
                className="close-icon"
                icon={faTimesCircle}
                onClick={onCloseClick}
                size="2x"
                tabIndex="0"
                title="Close Button"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  // will be used on the div surrounding the content box
  className: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
