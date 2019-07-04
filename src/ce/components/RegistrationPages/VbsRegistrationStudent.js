import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import moment from 'moment';
import constants from '../../../utils/constants';

import Button from '../Reusable/Button/Button';
import Checkbox from '../Reusable/Checklist/Checkbox';
import Modal from '../Reusable/Modal/Modal';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

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
const USE_TEST_DATA = false;

const STUDENT_TYPES = {
  CHILD: 'CHILD',
  ADULT: 'ADULT'
};

const agreementCheckedId = 'agreement-checked';

class VbsRegistrationStudent extends Component {
  static propTypes = {
    studentType: PropTypes.oneOf(Object.values(STUDENT_TYPES))
  };

  state = this._initialState;

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.postStatus && this.state.postStatus) {
      const successBox = document.getElementById('success-error-box');
      successBox.focus();
    }
  }

  get _fieldsInfo() {
    const fieldObject = {
      studentName: {
        fieldId: 'studentName',
        label: 'Student’s name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },

      childDob: {
        fieldId: 'childDob',
        label: 'Child’s Date of Birth',
        fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate]
      },

      email: {
        fieldId: 'email',
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
      phone: {
        fieldId: 'phone',
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
    if (this.props.studentType === STUDENT_TYPES.ADULT) {
      delete fieldObject.parentName;
      delete fieldObject.childDob;
    }

    return fieldObject;
  }

  get _initialState() {
    const registrationData = getRegistrationData(true) || {};
    resetRegistrationData();

    const testData = {
      studentName: 'Delete Me',
      childDob: '01/01/2000',
      email: '',
      parentName: 'Test Parent',
      phone: '000-000-0000',
      address1: '0000 Test Address',
      address2: 'Test Floor',
      city: 'Apalooza',
      state: 'MD',
      zip: '00000',
      subscribe: true,
      knownAllergies: 'Things I am allergic to'
    };

    const fieldStates = {};

    // setting values for field states
    Object.values(this._fieldsInfo).forEach(fieldData => {
      const {fieldId} = fieldData;
      let value = registrationData[fieldId] || '';

      if (value === '' && fieldData.default !== undefined) {
        value = fieldData.default;
      }

      if (value === '' && USE_TEST_DATA) {
        value = testData[fieldId];
      }

      fieldStates[fieldId] = value;
    });

    return {
      ...fieldStates,
      errors: [],
      redirect: false,
      showModal: false,
      [agreementCheckedId]: false
    };
  }

  _onChangeInput = (value, id) => {
    this.setState({[id]: value, postStatus: undefined});
  };

  _pushToFirebase(studentType) {
    const vbsYear = utils.getVbsDbYear();
    const studentIdPropName = constants.VBS_REGISTERED_STUDENT_ID_PROP;
    const refName = `${constants.VBS_REGISTERED_STUDENT_REF_NAME}/${vbsYear}`;

    const student = {
      [studentIdPropName]: utils.generatePushID(),
      registerTime: new Date().toISOString()
    };

    Object.values(this._fieldsInfo).forEach(({fieldId}) => {
      student[fieldId] = this.state[fieldId];
    });

    student.type = studentType;

    let regAnotherStudentPath;
    if (studentType === STUDENT_TYPES.CHILD) {
      const standardChildDob = moment(
        this.state.childDob,
        constants.VALID_INPUT_DATE_FORMATS
      ).format(constants.INTERNAL_DATE_FORMAT);

      student.childDob = standardChildDob;
      student.parentNames = [this.state.parentName];

      regAnotherStudentPath = routePaths.CE_VBS_REG_CHILD;
    } else {
      delete student.childDob;
      delete student.parentName;

      regAnotherStudentPath = routePaths.CE_VBS_REG_ADULT;
    }

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef
      .push(student)
      .then(() => {
        saveRegistrationData(student, regAnotherStudentPath);
        this.setState({redirect: true});
      })
      .catch(responseError => {
        this.setState({postStatus: 'failure', responseError});
      });
  }

  _onSubmitClick() {
    const errors = registrationUtils.getPageErrors(
      this.state,
      Object.values(this._fieldsInfo)
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

  _renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Student Registration</h2>
        <p>
          Complete the following form to register for Vacation Bible School. For
          timely enrollment, please double-check your responses before clicking
          the <span className="bold">Submit</span> button.
        </p>
      </div>
    );
  }

  _renderChildNameInput() {
    return (
      <Text
        id="childDob"
        label="Child’s Date of Birth"
        onChange={(value, id) => this._onChangeInput(value, id)}
        placeholder="mm/dd/yyyy"
        required
        size={1 * WIDTH_BASE}
        value={this.state.childDob}
      />
    );
  }

  _renderParentNameInput() {
    return (
      <Text
        id="parentName"
        label="Parent Name"
        onChange={(value, id) => this._onChangeInput(value, id)}
        required
        size={2 * WIDTH_BASE}
        value={this.state.parentName}
      />
    );
  }

  _renderFormFields() {
    const isChild = this.props.studentType === STUDENT_TYPES.CHILD;
    return (
      <div id="form-fields">
        <Text
          id="studentName"
          label="Student’s Name"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={2 * WIDTH_BASE}
          value={this.state.studentName}
        />
        {isChild && (
          <>
            {this._renderChildNameInput()}
            <h3>Parent/Guardian Information</h3>
          </>
        )}
        <Text
          id="email"
          label="Email Address"
          onChange={(value, id) => this._onChangeInput(value, id)}
          size={2 * WIDTH_BASE}
          value={this.state.email}
        />
        {isChild && (
          <>
            <br />
            {this._renderParentNameInput()}
          </>
        )}
        <Text
          id="phone"
          label="Best Phone Number to Reach You"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={1 * WIDTH_BASE}
          value={this.state.phone}
        />
        <br />
        <Text
          id="address1"
          label="Address Line 1"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={4 * WIDTH_BASE}
          value={this.state.address1}
        />
        <br />
        <Text
          id="address2"
          label="Address Line 2"
          onChange={(value, id) => this._onChangeInput(value, id)}
          size={4 * WIDTH_BASE}
          value={this.state.address2}
        />
        <br />
        <Text
          id="city"
          label="City"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.city}
        />
        <Text
          id="state"
          label="State"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={1.5 * WIDTH_BASE}
          value={this.state.state}
        />
        <br />
        <Text
          id="zip"
          label="ZIP Code"
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={Math.floor(0.8 * WIDTH_BASE)}
          value={this.state.zip}
        />
        <Checkbox
          checked={this.state.subscribe}
          className="registration-checkbox"
          id="subscribe"
          label="I'd like to know what other exciting events you have going on in the Temple!"
          onChange={(value, id) => this._onChangeInput(value, id)}
          value="subscribe"
        />
        <br />
        <Text
          columns={4 * WIDTH_BASE}
          id="knownAllergies"
          label="List any known food allergies. Mark N/A if none."
          onChange={(value, id) => this._onChangeInput(value, id)}
          required
          size={200}
          textArea
          value={this.state.knownAllergies}
        />
        <br />
        <DisclaimerCheckbox
          checked={this.state[agreementCheckedId]}
          id={agreementCheckedId}
          onChange={this._onChangeInput}
        />
        <Button onClick={() => this._onSubmitClick()}>Submit</Button>
      </div>
    );
  }

  _renderSummaryModal() {
    const {studentType} = this.props;
    const fieldSummaryItems = Object.values(this._fieldsInfo).reduce(
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
      <Modal
        className="registration-modal"
        onCloseClick={() => this._toggleModal()}
      >
        <h2>Please take a moment to confirm your data</h2>
        <ul>{fieldSummaryItems}</ul>
        <Button onClick={() => this._pushToFirebase(studentType)}>
          Confirm
        </Button>
        <Button onClick={() => this._toggleModal()}>Edit</Button>
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

    const hasErrors = Boolean(errors.length);

    return (
      <div className="registration-page">
        {this._renderHeaderContent()}
        {hasErrors && <ErrorList errors={errors} />}
        {this._renderFormFields()}
        {Boolean(hasErrors || postStatus) && (
          <PostSubmitStatusMessage
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
        {showModal && postStatus !== 'failure' && this._renderSummaryModal()}
      </div>
    );
  }
}

export {STUDENT_TYPES};
export default VbsRegistrationStudent;
