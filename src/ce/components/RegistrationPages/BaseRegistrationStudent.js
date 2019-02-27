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

import {
  saveRegistrationData,
  getRegistrationData,
  resetRegistrationData
} from '../../../stores/lastSubmittedRegistration';

import './Registration.css';
import ErrorList from '../Common/ErrorList';
import PostSubmitStatusMessage from '../Common/PostSubmitStatusMessage';
import DisclaimerCheckbox from './DisclaimerCheckbox';

const WIDTH_BASE = 15;

const FIELDS_INFO = {
  childName: {
    fieldId: `childName`,
    label: 'Child’s name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },

  childDob: {
    fieldId: `childDob`,
    label: 'Child’s Date of Birth',
    fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate]
  },

  parentEmail: {
    fieldId: 'parentEmail',
    label: 'Email Address',
    fieldRules: [fieldValidators.isValidEmail]
  },
  parentName: {
    fieldId: 'parentName',
    label: 'Parent’s Name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  parentPhone: {
    fieldId: 'parentPhone',
    label: 'Phone Number',
    fieldRules: [fieldValidators.isPhoneNumber, fieldValidators.isNotEmpty]
  },
  address1: {
    fieldId: 'address1',
    label: 'Address Line 1',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  address2: {fieldId: 'address2', label: 'Address Line 2'},
  city: {
    fieldId: 'city',
    label: 'City',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  state: {
    fieldId: 'state',
    label: 'State',
    fieldRules: [
      fieldValidators.isAllLetters,
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  zip: {
    fieldId: 'zip',
    label: 'ZIP Code',
    fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isValidZip]
  },
  subscribe: {
    fieldId: 'subscribe',
    default: false,
    label: 'Subscribe'
  },
  knownAllergies: {
    fieldId: 'knownAllergies',
    label: 'Known Allergies',
    fieldRules: [fieldValidators.isNotEmpty]
  }
};

class BaseRegistrationStudent extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();

    this._onChangeInput = this._onChangeInput.bind(this);
    this._renderFormFields = this._renderFormFields.bind(this);
    this._onSubmitClick = this._onSubmitClick.bind(this);
    this._pushToFirebase = this._pushToFirebase.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  _getState() {
    const registrationData = getRegistrationData(true) || {};
    resetRegistrationData();

    const testData = {
      childName: 'Delete Me',
      childDob: '01/01/2000',
      parentEmail: '',
      parentName: 'Test Parent',
      parentPhone: '000-000-0000',
      address1: '0000 Test Address',
      address2: 'Test Floor',
      city: 'Apalooza',
      state: 'MD',
      zip: '00000',
      subscribe: true,
      knownAllergies: 'Things I am allergic to'
    };

    const useTestData = false;
    const fieldStates = {};

    _.forEach(FIELDS_INFO, fieldData => {
      const {fieldId} = fieldData;
      let value = registrationData[fieldId] || '';

      if (value === '' && fieldData.default !== undefined) {
        value = fieldData.default;
      }

      if (value === '' && useTestData) {
        value = testData[fieldId];
      }

      fieldStates[fieldId] = value;
    });

    return {
      ...fieldStates,
      errors: [],
      redirect: false,
      showModal: false,
      agreementChecked: false
    };
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _pushToFirebase() {
    const {childIdPropName, refName} = this.props;

    const child = {
      [childIdPropName]: utils.generatePushID(),
      registerTime: new Date().toISOString(),
      parentNames: [this.state.parentName]
    };

    _.forEach(FIELDS_INFO, ({fieldId}) => {
      child[fieldId] = this.state[fieldId];
    });

    const standardChildDob = moment(
      this.state.childDob,
      constants.VALID_INPUT_DATE_FORMATS
    ).format(constants.INTERNAL_DATE_FORMAT);

    child.childDob = standardChildDob;

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef.push(child, responseError => {
      if (responseError) {
        this.setState({postStatus: 'failure', responseError});
      } else {
        saveRegistrationData(child, this.props.routePath);
        this.setState({redirect: true});
      }
    });
  }

  _onSubmitClick() {
    const errors = registrationUtils.getPageErrors(
      this.state,
      Object.values(FIELDS_INFO)
    );

    this.setState({
      postStatus: undefined,
      showModal: !errors.length,
      errors
    });
  }

  _toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  _renderFormFields() {
    return (
      <div id="form-fields">
        <Text
          id="childName"
          label="Child’s Name"
          onChange={this._onChangeInput}
          required
          size={2 * WIDTH_BASE}
          value={this.state.childName}
        />
        <Text
          id="childDob"
          label="Child’s Date of Birth"
          onChange={this._onChangeInput}
          placeholder="mm/dd/yyyy"
          required
          size={1 * WIDTH_BASE}
          value={this.state.childDob}
        />
        <h3>Parent/Guardian Information</h3>
        <Text
          id="parentEmail"
          label="Email Address"
          onChange={this._onChangeInput}
          size={2 * WIDTH_BASE}
          value={this.state.parentEmail}
        />
        <br />
        <Text
          id="parentName"
          label="Parent Name"
          onChange={this._onChangeInput}
          required
          size={2 * WIDTH_BASE}
          value={this.state.parentName}
        />
        <Text
          id="parentPhone"
          label="Best Phone Number to Reach You"
          onChange={this._onChangeInput}
          required
          size={1 * WIDTH_BASE}
          value={this.state.parentPhone}
        />
        <br />
        <Text
          id="address1"
          label="Address Line 1"
          onChange={this._onChangeInput}
          required
          size={4 * WIDTH_BASE}
          value={this.state.address1}
        />
        <br />
        <Text
          id="address2"
          label="Address Line 2"
          onChange={this._onChangeInput}
          size={4 * WIDTH_BASE}
          value={this.state.address2}
        />
        <br />
        <Text
          id="city"
          label="City"
          onChange={this._onChangeInput}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.city}
        />
        <Text
          id="state"
          label="State"
          onChange={this._onChangeInput}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.state}
        />
        <br />
        <Text
          id="zip"
          label="ZIP Code"
          onChange={this._onChangeInput}
          required
          size={Math.floor(0.8 * WIDTH_BASE)}
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
          columns={4 * WIDTH_BASE}
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={this._onChangeInput}
          required
          size={200}
          textArea
          value={this.state.knownAllergies}
        />
        <br />
        <DisclaimerCheckbox
          checked={this.state.agreementChecked}
          id="agreementChecked"
          onChange={this._onChangeInput}
        />

        <Button onClick={this._onSubmitClick}>Submit</Button>
      </div>
    );
  }

  _renderSummaryModal() {
    const fieldSummaryItems = Object.values(FIELDS_INFO).reduce(
      (items, field) => {
        const {fieldId, label} = field;

        let value = this.state[fieldId];
        if (typeof value === 'boolean') {
          value = value ? 'Yes' : 'No';
        }

        if (value) {
          items.push(
            <li key={fieldId}>
              <span className="bold">{label}</span>: {value}
            </li>
          );
        }

        return items;
      },
      []
    );

    return (
      <Modal className="registration-modal" onCloseClick={this._toggleModal}>
        <h2>Please take a moment to confirm your data</h2>
        <ul>{fieldSummaryItems}</ul>
        <Button onClick={this._pushToFirebase}>Confirm</Button>
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

    const formFields = this._renderFormFields();
    const modal =
      showModal && postStatus !== 'failure' && this._renderSummaryModal();
    const hasErrors = Boolean(errors.length);

    return (
      <div className={this.props.className}>
        {this.props.headerContent}
        {hasErrors && <ErrorList errors={errors} />}
        {formFields}
        {Boolean(hasErrors || postStatus) && (
          <PostSubmitStatusMessage
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
        {modal}
      </div>
    );
  }
}

BaseRegistrationStudent.propTypes = {
  childIdPropName: PropTypes.string.isRequired,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  refName: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired
};

export default BaseRegistrationStudent;
