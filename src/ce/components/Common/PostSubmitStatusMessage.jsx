import React from 'react';
import PropTypes from 'prop-types';

const POST_STATUSES = {
  SUCCESS: 'success',
  FAILURE: 'failure'
};

class PostSubmitStatusMessage extends React.Component {
  componentDidMount() {
    this.errorBox && this.errorBox.focus();
  }

  render() {
    const {postStatus, responseError = {}} = this.props;

    let className;
    let message;
    if (postStatus === 'success') {
      className = 'success';
      message = 'Success! Ready for more registration info';
    } else {
      className = 'failure';

      if (postStatus === 'failure') {
        message = (
          <div>
            Submission failed
            <br />
            Code: {responseError.code}
            <br />
            Message: {responseError.message}
            <br />
            Please try again or contact the administrator
          </div>
        );
      } else {
        message = (
          <div>
            Invalid data entered
            <br />
            Please check your fields and the error at the top of the page.
          </div>
        );
      }
    }

    return (
      <div
        className={className}
        id="success-error-box"
        ref={node => (this.errorBox = node)}
        tabIndex="0"
      >
        {message}
      </div>
    );
  }
}

PostSubmitStatusMessage.propTypes = {
  postStatus: PropTypes.oneOf(Object.values(POST_STATUSES)),
  responseError: PropTypes.object
};

export {POST_STATUSES};
export default PostSubmitStatusMessage;
