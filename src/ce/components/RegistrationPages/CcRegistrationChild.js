import firebase from '../../../firebase';
import React, {Component} from 'react';
import moment from 'moment';

import Button from '../Reusable/Button/Button';
import Checkbox from '../Reusable/Checklist/Checkbox';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import constants from '../../../utils/constants';
import utils from '../../../utils/commonUtils';

import './Registration.css';

class CcRegistrationChild extends Component {
  constructor(props) {
    super(props);
    this.state = this._getFreshState();

    this._onChangeInput = this._onChangeInput.bind(this);
    this._renderFormFields = this._renderFormFields.bind(this);
    this._setErrors = this._setErrors.bind(this);
    this._submitData = this._submitData.bind(this);
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

  _submitData() {
    const standardChildDob = moment(
      this.state.childDob,
      constants.VALID_INPUT_DATE_FORMATS
    ).format(constants.INTERNAL_DATE_FORMAT);

    const child = {
      ccRegisteredId: utils.generatePushID(),
      childName: this.state.childName,
      childDob: standardChildDob,
      city: this.state.city || null,
      parentEmail: this.state.parentEmail,
      parentNames: [this.state.parentName],
      parentPhone: this.state.parentPhone,
      address1: this.state.address1,
      address2: this.state.address2,
      state: this.state.state,
      zip: this.state.zip,
      subscribe: this.state.subscribe,
      knownAllergies: this.state.knownAllergies
    };

    const ccRegisteredRef = firebase.database().ref('ccRegistered');
    ccRegisteredRef.push(child, responseError => {
      if (responseError) {
        this.setState({postStatus: 'failure', responseError});
      } else {
        this._postSubmitSuccess();
      }
    });
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

    const errors = registrationUtils.getPageErrors(this.state, allRules);
    if (!errors.length) {
      this._submitData();
    }

    this.setState({errors});
  }

  _postSubmitSuccess() {
    this.setState({postStatus: 'success', ...this._getFreshState()});
  }

  _renderFormFields() {
    return (
      <div id="form-fields">
        <Text
          id={'childName'}
          label="Child’s Name"
          onChange={this._onChangeInput}
          required
          size={20}
          value={this.state.childName}
        />
        <Text
          id={'childDob'}
          label="Child’s Date of Birth"
          onChange={this._onChangeInput}
          required
          size={10}
          value={this.state.childDob}
        />

        <h3>Parent/Guardian Information</h3>

        <div>
          <Text
            id={'parentEmail'}
            label="Email Address"
            onChange={this._onChangeInput}
            size={20}
            value={this.state.parentEmail}
          />
        </div>
        <div>
          <Text
            id={'parentName'}
            label="Name"
            onChange={this._onChangeInput}
            required
            size={20}
            value={this.state.parentName}
          />
          <Text
            id={'parentPhone'}
            label="Best Phone Number to Reach You"
            onChange={this._onChangeInput}
            required
            size={10}
            value={this.state.parentPhone}
          />
        </div>
        <div>
          <Text
            id={'address1'}
            label="Address Line 1"
            onChange={this._onChangeInput}
            required
            size={40}
            value={this.state.address1}
          />
        </div>
        <div>
          <Text
            id={'address2'}
            label="Address Line 2"
            onChange={this._onChangeInput}
            size={40}
            value={this.state.address2}
          />
        </div>
        <div>
          <Text
            id={'state'}
            label="State"
            onChange={this._onChangeInput}
            required
            size={20}
            value={this.state.state}
          />
          <Text
            id={'zip'}
            label="ZIP Code"
            onChange={this._onChangeInput}
            required
            size={8}
            value={this.state.zip}
          />
          <Checkbox
            checked={this.state.subscribe}
            className="registration-checkbox"
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
          size={50}
          textArea
          value={this.state.knownAllergies}
        />
        <div>
          <Button onClick={this._setErrors}>Submit</Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="registration-page">
        <h1>Children’s Church</h1>
        <h2>Child Registration</h2>
        <p>
          Complete the following form to register your child(ren) for Children’s
          Church. For timely enrollment, please double-check your responses
          before clicking the <span className="bold">Submit</span> button.
        </p>

        {registrationUtils.renderErrors(this.state.errors)}
        {this._renderFormFields()}
        {registrationUtils.renderStatusMessage(
          this.state.postStatus,
          this.state.errors,
          this.state.responseError
        )}
      </div>
    );
  }
}

export default CcRegistrationChild;
