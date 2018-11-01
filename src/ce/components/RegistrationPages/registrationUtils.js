import React from 'react';

const registrationUtils = {
  getPageErrors(state = {}, fieldInfo = []) {
    const errors = [];

    fieldInfo.forEach(rule => {
      const deprecatedIdProp = rule.id;

      const {fieldRules = [], fieldId = deprecatedIdProp, label} = rule;
      // TODO transition everything to use fieldId property name
      if (deprecatedIdProp || !fieldId) {
        console.log(
          '`id` provided for rule instead of `fieldId` for ',
          deprecatedIdProp,
          '. Use `fieldId` instead'
        );
      }

      const value = state[fieldId];

      fieldRules.forEach(checkFunc => {
        const message = checkFunc(value, label, state);

        if (message) {
          errors.push({
            fieldId,
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
          Oops, there were some errors!
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
            Submission failed
            <br />
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
            Invalid data entered
            <br />
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
  },

  requireQuickContact(value, row, state) {
    const {email, homePhone, mobilePhone} = state;
    if (!(email || homePhone || mobilePhone)) {
      return 'Email, home phone or mobile phone must be provided';
    }
  }
};

export default registrationUtils;
