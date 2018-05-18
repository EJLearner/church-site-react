import _ from 'lodash';

import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import moment from 'moment';

import Button from '../Reusable/Button/Button';
import Checkbox from '../Reusable/Checklist/Checkbox';
import Modal from '../Reusable/Modal/Modal';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';

import './Registration.css';

const FIELDS_INFO = {
  childName: {
    fieldId: 'childName',
    dbId: 'childName',
    label: 'Child’s name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  childDob: {
    fieldId: 'childDob',
    dbId: 'childDob',
    label: 'Child’s Date of Birth',
    fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate]
  },
  parentEmail: {
    fieldId: 'parentEmail',
    dbId: 'parentEmail',
    label: 'Email Address',
    fieldRules: [fieldValidators.isValidEmail]
  },
  parentName: {
    fieldId: 'parentName',
    dbId: 'parentName',
    label: 'Parent’s Name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  parentPhone: {
    fieldId: 'parentPhone',
    dbId: 'parentPhone',
    label: 'Phone Number',
    fieldRules: [fieldValidators.isPhoneNumber, fieldValidators.isNotEmpty]
  },
  address1: {
    fieldId: 'address1',
    dbId: 'address1',
    label: 'Address Line 1',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  address2: {fieldId: 'address2', dbId: 'address2', label: 'Address Line 2'},
  city: {
    fieldId: 'city',
    dbId: 'city',
    label: 'City',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  state: {
    fieldId: 'state',
    dbId: 'state',
    label: 'State',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  zip: {
    fieldId: 'zip',
    dbId: 'zip',
    label: 'ZIP Code',
    fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isValidZip]
  },
  subscribe: {fieldId: 'subscribe', label: 'Subscribe', dbId: 'subscribe'},
  knownAllergies: {
    fieldId: 'knownAllergies',
    dbId: 'knownAllergies',
    label: 'Known Allergies',
    fieldRules: [fieldValidators.isNotEmpty]
  }
};

class VbsRegistrationChild extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();

    this._onChangeInput = this._onChangeInput.bind(this);
    this._renderFormFields = this._renderFormFields.bind(this);
    this._validateAndSubmit = this._validateAndSubmit.bind(this);
    this._submitData = this._submitData.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  _getState() {
    return {
      // form data
      [FIELDS_INFO.childName.fieldId]: '',
      [FIELDS_INFO.childDob.fieldId]: '',
      [FIELDS_INFO.parentEmail.fieldId]: '',
      [FIELDS_INFO.parentName.fieldId]: '',
      [FIELDS_INFO.parentPhone.fieldId]: '',
      [FIELDS_INFO.address1.fieldId]: '',
      [FIELDS_INFO.address2.fieldId]: '',
      [FIELDS_INFO.city.fieldId]: '',
      [FIELDS_INFO.state.fieldId]: '',
      [FIELDS_INFO.zip.fieldId]: '',
      [FIELDS_INFO.subscribe.fieldId]: false,
      [FIELDS_INFO.knownAllergies.fieldId]: '',

      // testing data

      // [FIELDS_INFO.childName.fieldId]: 'Test Child',
      // [FIELDS_INFO.childDob.fieldId]: '01/01/2018',
      // [FIELDS_INFO.parentEmail.fieldId]: '',
      // [FIELDS_INFO.parentName.fieldId]: 'sdfsd',
      // [FIELDS_INFO.parentPhone.fieldId]: '000-000-0000',
      // [FIELDS_INFO.address1.fieldId]: 'sdfsdff',
      // [FIELDS_INFO.address2.fieldId]: '',
      // [FIELDS_INFO.city.fieldId]: 'bestCity',
      // [FIELDS_INFO.state.fieldId]: 'sdf',
      // [FIELDS_INFO.zip.fieldId]: '00000',
      // [FIELDS_INFO.subscribe.fieldId]: false,
      // [FIELDS_INFO.knownAllergies.fieldId]: 'sdfsd',

      // other
      errors: [],
      redirect: false,
      showModal: false
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

    _.values(FIELDS_INFO).forEach(field => {
      const {fieldId, dbId} = field;
      child[dbId] = this.state[fieldId];
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

  _validateAndSubmit() {
    const errors = registrationUtils.getPageErrors(
      this.state,
      _.values(FIELDS_INFO)
    );

    if (!errors.length) {
      this._toggleModal();
    }

    this.setState({errors});
  }

  _postSubmitSuccess() {
    this.setState({redirect: true});
  }

  _toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  _renderFormFields() {
    const widthBase = 15;

    return (
      <div id="form-fields">
        <Text
          id="childName"
          label="Child’s Name"
          onChange={this._onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.childName}
        />
        <Text
          id="childDob"
          label="Child’s Date of Birth"
          onChange={this._onChangeInput}
          placeholder="mm/dd/yyyy"
          required
          size={1 * widthBase}
          value={this.state.childDob}
        />
        <h3>Parent/Guardian Information</h3>
        <Text
          id="parentEmail"
          label="Email Address"
          onChange={this._onChangeInput}
          size={2 * widthBase}
          value={this.state.parentEmail}
        />
        <br />
        <Text
          id="parentName"
          label="Name"
          onChange={this._onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.parentName}
        />
        <Text
          id="parentPhone"
          label="Best Phone Number to Reach You"
          onChange={this._onChangeInput}
          required
          size={1 * widthBase}
          value={this.state.parentPhone}
        />
        <br />
        <Text
          id="address1"
          label="Address Line 1"
          onChange={this._onChangeInput}
          required
          size={4 * widthBase}
          value={this.state.address1}
        />
        <br />
        <Text
          id="address2"
          label="Address Line 2"
          onChange={this._onChangeInput}
          size={4 * widthBase}
          value={this.state.address2}
        />
        <br />
        <Text
          id="city"
          label="City"
          onChange={this._onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.city}
        />
        <Text
          id="state"
          label="State"
          onChange={this._onChangeInput}
          required
          size={1.5 * widthBase}
          value={this.state.state}
        />
        <br />
        <Text
          id="zip"
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
        <Button onClick={this._validateAndSubmit}>Submit</Button>
      </div>
    );
  }

  _renderSummaryModal() {
    const fieldSummaryItems = _.values(FIELDS_INFO).map(field => {
      const {fieldId, label} = field;
      const value = String(this.state[fieldId]) || 'EMPTY';

      return (
        <li key={fieldId}>
          {label}: {value}
        </li>
      );
    });

    return (
      <Modal onCloseClick={this._toggleModal}>
        <h2>Please take a moment to confirm your data</h2>
        <ul>{fieldSummaryItems}</ul>
        <Button onClick={this._submitData}>Confirm</Button>
        <Button onClick={this._toggleModal}>Edit</Button>
      </Modal>
    );
  }

  render() {
    const {redirect, postStatus, errors, responseError, showModal} = this.state;

    if (redirect) {
      const state = {forMessage: 'you for registering.'};

      return (
        <Redirect
          push
          to={{
            pathname: routePaths.CE_THANK_YOU,
            state
          }}
        />
      );
    }

    const renderedErrors = registrationUtils.renderErrors(errors);
    const formFields = this._renderFormFields();
    const statusMessage = registrationUtils.renderStatusMessage(
      postStatus,
      errors,
      responseError
    );
    const modal = showModal && this._renderSummaryModal();

    return (
      <div className={this.props.className}>
        {this.props.headerContent}
        {renderedErrors}
        {formFields}
        {statusMessage}
        {modal}
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