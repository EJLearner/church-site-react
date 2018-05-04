import firebase from '../../../firebase';
import PropTypes from 'prop-types';
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

class VbsRegistrationChild extends Component {
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
      city: '',
      state: '',
      zip: '',
      subscribe: false,
      knownAllergies: '',

      // childName: 'Test Child',
      // childDob: '01/01/2018',
      // parentEmail: '',
      // parentName: 'sdfsd',
      // parentPhone: '000-000-0000',
      // address1: 'sdfsdff',
      // address2: '',
      // city: 'bestCity',
      // state: 'sdf',
      // zip: '00000',
      // subscribe: false,
      // knownAllergies: 'sdfsd',

      errors: []
    };
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _submitData() {
    const {refName} = this.props;

    const standardChildDob = moment(
      this.state.childDob,
      constants.VALID_INPUT_DATE_FORMATS
    ).format(constants.INTERNAL_DATE_FORMAT);

    const child = {
      [refName + 'Id']: utils.generatePushID(),
      childDob: standardChildDob,
      parentNames: [this.state.parentName]
    };

    [
      'childName',
      'city',
      'parentEmail',
      'parentPhone',
      'address1',
      'address2',
      'state',
      'zip',
      'subscribe',
      'knownAllergies'
    ].forEach(field => {
      child[field] = this.state[field];
    });

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef.push(child, responseError => {
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
        id: 'city',
        label: 'City',
        fieldRules: [
          fieldValidators.isAllLetters,
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
    const widthBase = 15;

    return (
      <div id="form-fields">
        <Text
          id={'childName'}
          label="Child’s Name"
          onChange={this._onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.childName}
        />
        <Text
          id={'childDob'}
          label="Child’s Date of Birth"
          onChange={this._onChangeInput}
          placeholder="mm/dd/yyyy"
          required
          size={1 * widthBase}
          value={this.state.childDob}
        />
        <h3>Parent/Guardian Information</h3>
        <Text
          id={'parentEmail'}
          label="Email Address"
          onChange={this._onChangeInput}
          size={2 * widthBase}
          value={this.state.parentEmail}
        />
        <br />
        <Text
          id={'parentName'}
          label="Name"
          onChange={this._onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.parentName}
        />
        <Text
          id={'parentPhone'}
          label="Best Phone Number to Reach You"
          onChange={this._onChangeInput}
          required
          size={1 * widthBase}
          value={this.state.parentPhone}
        />
        <br />
        <Text
          id={'address1'}
          label="Address Line 1"
          onChange={this._onChangeInput}
          required
          size={4 * widthBase}
          value={this.state.address1}
        />
        <br />
        <Text
          id={'address2'}
          label="Address Line 2"
          onChange={this._onChangeInput}
          size={4 * widthBase}
          value={this.state.address2}
        />
        <br />
        <Text
          id={'city'}
          label="City"
          onChange={this._onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.city}
        />
        <Text
          id={'state'}
          label="State"
          onChange={this._onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.state}
        />
        <br />
        <Text
          id={'zip'}
          label="ZIP Code"
          onChange={this._onChangeInput}
          required
          size={Math.floor(0.8 * widthBase)}
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
        <br />
        <Text
          columns={4 * widthBase}
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={this._onChangeInput}
          required
          size={200}
          textArea
          value={this.state.knownAllergies}
        />
        <br />
        <Button onClick={this._setErrors}>Submit</Button>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.headerContent}

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

VbsRegistrationChild.propTypes = {
  className: PropTypes.string,
  headerContent: PropTypes.node,
  refName: PropTypes.string.isRequired
};

export default VbsRegistrationChild;
