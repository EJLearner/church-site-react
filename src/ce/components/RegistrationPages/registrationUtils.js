import React from 'react';

const registrationUtils = {
  getPageErrors(state = {}, rules = []) {
    const errors = [];
    rules.forEach(rule => {
      const {fieldRules, id, label} = rule;
      const value = state[id];

      fieldRules.forEach(checkFunc => {
        const message = checkFunc(value, label);

        if (message) {
          errors.push({
            id,
            message
          });
        }
      });
    });

    return errors;
  },

  renderErrors(errors) {
    const errorList = errors.map((error, index) => {
      return <li key={index}>{error.message}</li>;
    });

    if (errorList.length) {
      return (
        <div className="error-list">
          <i className="fa fa-exclamation-triangle" />
          {'Oops, there were some errors!'}
          <ul>{errorList}</ul>
        </div>
      );
    }

    return null;
  },

  renderStatusMessage(postStatus, fieldErrors, err = {}) {
    const id = 'success-error-box';
    if (postStatus || fieldErrors.length) {
      let className;
      let message;
      if (postStatus === 'success') {
        className = 'success';
        message = 'Success! Ready for more registration info';
      } else if (postStatus === 'failure') {
        className = 'failure';
        message = (
          <div>
            Submission failed<br />
            Code: {err.code}
            <br />
            Message: {err.message}
            <br />
            Please try again or contact the administrator
          </div>
        );
      } else {
        className = 'failure';
        message = (
          <div>
            Invalid data entered<br />
            Please check your fields and the error at the top of the page.
          </div>
        );
      }

      return (
        <div className={className} id={id} tabIndex="0">
          {message}
        </div>
      );
    }

    return null;
  }
};

export default registrationUtils;
