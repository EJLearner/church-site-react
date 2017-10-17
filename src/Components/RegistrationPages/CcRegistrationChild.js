import React, {Component} from 'react';
import moment from 'moment';

import Checkbox from '../Reusable/Checklist/Checkbox';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import {post} from 'jquery';

import './CcRegistration.css';

class CcRegistrationChild extends Component {
  constructor(props) {
    super(props);
    this.state = this._getFreshState();

    this._onChangeInput = this._onChangeInput.bind(this);
    this._setErrors = this._setErrors.bind(this);
    this._submitData = this._submitData.bind(this);
    this._renderStatusMessage = this._renderStatusMessage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  _getFreshState() {
    return {
      childName: '',
      childDob: '',
      childAge: '',
      parentEmail: '',
      parentName: '',
      parentPhone: '',
      address1: '',
      address2: '',
      state: '',
      zip: '',
      subscribe: false,
      knownAllergies: '',

      errors: []
    };
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _getPageErrors(state = {}, rules = []) {
    const errors = [];
    rules.forEach(rule => {
      const {fieldRules, id, label} = rule;
      const value = this.state[id];

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
  }

  _renderErrors(errors) {
    const errorList = errors.map((error, index) => {
      return <li key={index}>{error.message}</li>;
    });

    return <ul className="error-list">{errorList}</ul>;
  }

  _getYearsFromToday(dobString) {
    return moment().diff(
      moment(this.state.childDob, fieldValidators.validDateFormats),
      'years'
    );
  }

  _submitData() {
    const {childDob} = this.state;

    const data = {
      childName: this.state.childName,
      childDob: this.state.childDob,
      childAge: this._getYearsFromToday(childDob),
      parentEmail: this.state.parentEmail,
      parentName: this.state.parentName,
      parentPhone: this.state.parentPhone,
      address1: this.state.address1,
      address2: this.state.address2,
      state: this.state.state,
      zip: this.state.zip,
      subscribe: this.state.subscribe,
      knownAllergies: this.state.knownAllergies
    };

    post(
      'ccRegistrationFormChildProcess.php',
      data,
      response => {
        if (response.success) {
          this._postSubmitProcess();
        } else {
          this.setState({postStatus: 'failure'});
        }
      },
      'json'
    );
  }

  _setErrors() {
    const allRules = [
      {
        id: 'childName',
        label: 'Child’s name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        id: 'childDob',
        label: 'Child’s Date of Birth',
        fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate]
      },
      {
        id: 'parentEmail',
        label: 'Email Address',
        fieldRules: [fieldValidators.isValidEmail]
      },
      {
        id: 'parentName',
        label: 'Parent’s Name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        id: 'parentPhone',
        label: 'Phone Number',
        fieldRules: [fieldValidators.isPhoneNumber, fieldValidators.isNotEmpty]
      },
      {
        id: 'address1',
        label: 'Address Line 1',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        id: 'state',
        label: 'State',
        fieldRules: [
          fieldValidators.isAllLetters,
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        id: 'zip',
        label: 'ZIP Code',
        fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isValidZip]
      },
      {
        id: 'knownAllergies',
        label: 'Known Allergies',
        fieldRules: [fieldValidators.isNotEmpty]
      }
    ];

    const errors = this._getPageErrors(this.state, allRules);
    if (!errors.length) {
      this._submitData();
    }

    this.setState({errors});
  }

  _postSubmitProcess() {
    this.setState({postStatus: 'success', ...this._getFreshState()});
  }

  _renderStatusMessage() {
    const id = 'success-error-box';
    if (this.state.postStatus || this.state.errors.length) {
      let className;
      let message;
      if (this.state.postStatus === 'success') {
        className = 'success';
        message = 'Success! Ready for more registration info';
      } else if (this.state.postStatus === 'failure') {
        className = 'failure';
        message = (
          <div>
            Submission failed<br />
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

  render() {
    return (
      <div className="registration-page">
        <h1>Children’s Church</h1>
        <h2>Child Registration</h2>
        {this._renderErrors(this.state.errors)}

        <Text
          id={'childName'}
          label="Child’s Name"
          onChange={this._onChangeInput}
          required
          size="20"
          value={this.state.childName}
        />
        <Text
          id={'childDob'}
          label="Child’s Date of Birth"
          onChange={this._onChangeInput}
          required
          size="10"
          value={this.state.childDob}
        />

        <h3>Parent/Guardian Information</h3>

        <div>
          <Text
            id={'parentEmail'}
            label="Email Address"
            onChange={this._onChangeInput}
            size="20"
            value={this.state.email}
          />
        </div>
        <div>
          <Text
            id={'parentName'}
            label="Name"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.parentName}
          />
          <Text
            id={'parentPhone'}
            label="Best Phone Number to Reach You"
            onChange={this._onChangeInput}
            required
            size="10"
            value={this.state.parentPhone}
          />
        </div>
        <div>
          <Text
            id={'address1'}
            label="Address Line 1"
            onChange={this._onChangeInput}
            required
            size="40"
            value={this.state.address1}
          />
        </div>
        <div>
          <Text
            id={'address2'}
            label="Address Line 2"
            onChange={this._onChangeInput}
            size="40"
            value={this.state.address2}
          />
        </div>
        <div>
          <Text
            id={'state'}
            label="State"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.state}
          />
          <Text
            id={'zip'}
            label="ZIP Code"
            onChange={this._onChangeInput}
            required
            size="8"
            value={this.state.zip}
          />
          <Checkbox
            checked={this.state.subscribe}
            className="cc-registration-checkbox"
            id="subscribe"
            label="I'd like to know what other exciting events you have going on in the Temple!"
            onChange={this._onChangeInput}
            value="subscribe"
          />
        </div>
        <Text
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={this._onChangeInput}
          required
          textArea
          value={this.state.knownAllergies}
        />
        <div>
          <button onClick={this._setErrors}>Submit</button>
          {this._renderStatusMessage()}
        </div>
      </div>
    );
  }
}

export default CcRegistrationChild;

// TODO: Style button as discussed

// TODO: Error Message
// TODO: Include an orange hazard symbol and a message that reads "Oops...we think you made a mistake." (Century Gothic - same size as Parent/Guardian Information)

// TODO: For email that's sent to me
// TODO: Only send me the completed fields
// TODO: Send the email also to Tiffany and Phyllis
