import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const POST_STATUSES = {
  SUCCESS: 'success',
  FAILURE: 'failure'
};
const PostSubmitStatusMessageStyle = styled.div`
  margin-top: 16px;
  border: 1px solid $black;
  width: 300px;

  &.success {
    background-color: green;
  }

  &.failure {
    background-color: red;
  }
`;

const defaultInputErrorMessage = (
  <div>
    Invalid data entered
    <br />
    Please check your fields and the error at the top of the page.
  </div>
);

class PostSubmitStatusMessage extends React.Component {
  componentDidMount() {
    this.errorBox && this.errorBox.focus();
  }

  render() {
    const {inputErrorMessage, postStatus, responseError = {}} = this.props;

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
        message = inputErrorMessage;
      }
    }

    return (
      <PostSubmitStatusMessageStyle
        className={className}
        id="success-or-error-box"
        ref={node => (this.errorBox = node)}
        tabIndex="0"
        type={className}
      >
        {message}
      </PostSubmitStatusMessageStyle>
    );
  }
}

PostSubmitStatusMessage.propTypes = {
  inputErrorMessage: PropTypes.node,
  postStatus: PropTypes.oneOf(Object.values(POST_STATUSES)),
  responseError: PropTypes.object
};

PostSubmitStatusMessage.defaultProps = {
  inputErrorMessage: defaultInputErrorMessage
};

export {POST_STATUSES};
export default PostSubmitStatusMessage;
