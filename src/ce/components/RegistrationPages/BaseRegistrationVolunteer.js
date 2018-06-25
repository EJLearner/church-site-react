import _ from 'lodash';

import firebase from '../../../firebase';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Redirect} from 'react-router';

import Button from '../Reusable/Button/Button';
import Modal from '../Reusable/Modal/Modal';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';

import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';
import constants from '../../../utils/constants';

import './Registration.css';
import Checklist from '../Reusable/Checklist/Checklist';

const FIELDS_INFO = {
  email: {
    fieldId: 'email',
    label: 'Email Address',
    fieldRules: [fieldValidators.isValidEmail]
  },
  name: {
    fieldId: 'name',
    label: 'Name',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  dob: {
    fieldId: 'dob',
    label: 'Date of Birth',
    fieldRules: [fieldValidators.isDate]
  },

  address1: {
    fieldId: 'address1',
    label: 'Address Line 1',
    fieldRules: [
      fieldValidators.isNotEmpty,
      fieldValidators.isAtLeastTwoCharacters
    ]
  },
  address2: {fieldId: 'address2', dbId: 'address2', label: 'Address Line 2'},
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
  mobilePhone: {
    fieldId: 'mobilePhone',
    label: 'Mobile Phone',
    fieldRules: [fieldValidators.isPhoneNumber]
  },
  homePhone: {
    fieldId: 'homePhone',
    label: 'Home Phone',
    fieldRules: [fieldValidators.isPhoneNumber]
  },
  teacher: {
    fieldId: 'teacher',
    label: 'Teacher'
  },
  admin: {
    fieldId: 'admin',
    label: 'Administrative Staff'
  },
  assistantMentor: {
    fieldId: 'assistantMentor',
    label: 'Class Assistant/Hallway Monitor'
  },
  kitchen: {
    fieldId: 'kitchen',
    label: 'Kitchen Staff'
  },
  otherText: {
    fieldId: 'otherText',
    label: 'Other Role'
  },
  sundaySchool: {
    fieldId: 'sundaySchool',
    label: 'Sunday School'
  },
  bibleSchool: {
    fieldId: 'bibleSchool',
    label: 'Vacation Bible School'
  },
  youthMinistry: {
    fieldId: 'youthMinistry',
    label: 'Youth Ministory'
  },
  pastTeacher: {
    fieldId: 'pastTeacher',
    label: 'Teacher'
  },
  pastAdmin: {
    fieldId: 'pastAdmin',
    label: 'Administrative Staff'
  },
  pastTransition: {
    fieldId: 'pastTransition',
    label: 'Transition Team'
  },
  pastKitchen: {
    fieldId: 'pastKitchen',
    label: 'Kitchen Staff'
  },
  pastChaperone: {
    fieldId: 'pastChaperone',
    label: 'Chaperon'
  },
  monday: {
    fieldId: 'monday',
    label: 'Monday'
  },
  tuesday: {
    fieldId: 'tuesday',
    label: 'Tuesday'
  },
  wednesday: {
    fieldId: 'wednesday',
    label: 'Wednesday'
  },
  thursday: {
    fieldId: 'thursday',
    label: 'Thursday'
  },
  friday: {
    fieldId: 'friday',
    label: 'Friday'
  }
};

class BaseRegistrationChild extends Component {
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
      [FIELDS_INFO.email.fieldId]: '',
      [FIELDS_INFO.name.fieldId]: '',
      [FIELDS_INFO.dob.fieldId]: '',
      [FIELDS_INFO.address1.fieldId]: '',
      [FIELDS_INFO.address2.fieldId]: '',
      [FIELDS_INFO.city.fieldId]: '',
      [FIELDS_INFO.state.fieldId]: '',
      [FIELDS_INFO.zip.fieldId]: '',
      [FIELDS_INFO.mobilePhone.fieldId]: '',
      [FIELDS_INFO.homePhone.fieldId]: '',
      [FIELDS_INFO.teacher.fieldId]: false,
      [FIELDS_INFO.admin.fieldId]: false,
      [FIELDS_INFO.assistantMentor.fieldId]: false,
      [FIELDS_INFO.kitchen.fieldId]: false,
      [FIELDS_INFO.otherText.fieldId]: '',
      [FIELDS_INFO.sundaySchool.fieldId]: false,
      [FIELDS_INFO.bibleSchool.fieldId]: false,
      [FIELDS_INFO.youthMinistry.fieldId]: false,
      [FIELDS_INFO.pastTeacher.fieldId]: false,
      [FIELDS_INFO.pastAdmin.fieldId]: false,
      [FIELDS_INFO.pastTransition.fieldId]: false,
      [FIELDS_INFO.pastKitchen.fieldId]: false,
      [FIELDS_INFO.pastChaperone.fieldId]: false,
      [FIELDS_INFO.monday.fieldId]: false,
      [FIELDS_INFO.tuesday.fieldId]: false,
      [FIELDS_INFO.wednesday.fieldId]: false,
      [FIELDS_INFO.thursday.fieldId]: false,
      [FIELDS_INFO.friday.fieldId]: false,

      // testing data
      // [FIELDS_INFO.email.fieldId]: 'lskdjf@sdklfjsd.com',
      // [FIELDS_INFO.name.fieldId]: 'test name',
      // [FIELDS_INFO.dob.fieldId]: '01/01/2018',
      // [FIELDS_INFO.address1.fieldId]: 'test address 1',
      // [FIELDS_INFO.address2.fieldId]: 'test address 2',
      // [FIELDS_INFO.city.fieldId]: 'test',
      // [FIELDS_INFO.state.fieldId]: 'test state',
      // [FIELDS_INFO.zip.fieldId]: '20103',
      // [FIELDS_INFO.mobilePhone.fieldId]: '000-000-0123',
      // [FIELDS_INFO.homePhone.fieldId]: '000-000-1111',
      // [FIELDS_INFO.teacher.fieldId]: true,
      // [FIELDS_INFO.admin.fieldId]: true,
      // [FIELDS_INFO.assistantMentor.fieldId]: true,
      // [FIELDS_INFO.kitchen.fieldId]: true,
      // [FIELDS_INFO.otherText.fieldId]: 'Something else',
      // [FIELDS_INFO.sundaySchool.fieldId]: true,
      // [FIELDS_INFO.bibleSchool.fieldId]: true,
      // [FIELDS_INFO.youthMinistry.fieldId]: true,
      // [FIELDS_INFO.pastTeacher.fieldId]: true,
      // [FIELDS_INFO.pastAdmin.fieldId]: true,
      // [FIELDS_INFO.pastTransition.fieldId]: true,
      // [FIELDS_INFO.pastKitchen.fieldId]: true,
      // [FIELDS_INFO.pastChaperone.fieldId]: true,
      // [FIELDS_INFO.monday.fieldId]: true,
      // [FIELDS_INFO.tuesday.fieldId]: true,
      // [FIELDS_INFO.wednesday.fieldId]: true,
      // [FIELDS_INFO.thursday.fieldId]: true,
      // [FIELDS_INFO.friday.fieldId]: true,

      // other
      errors: [],
      redirect: false,
      showModal: false,
      showOther: false
    };
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _submitData() {
    const {refName} = this.props;

    const volunteer = {
      [refName + 'Id']: utils.generatePushID(),
      timeChanged: new Date().toISOString()
    };

    _.values(FIELDS_INFO).forEach(field => {
      const {fieldId} = field;
      volunteer[fieldId] = this.state[fieldId];
    });

    const standardDob = moment(
      this.state.dob,
      constants.VALID_INPUT_DATE_FORMATS
    ).format(constants.INTERNAL_DATE_FORMAT);

    volunteer.dob = standardDob;

    const firebaseRef = firebase.database().ref(refName);

    firebaseRef.push(volunteer, responseError => {
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

    this.setState({
      postStatus: undefined,
      showModal: !errors.length,
      errors
    });
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
          id="email"
          label="Email Address"
          onChange={this._onChangeInput}
          size={2 * widthBase}
          value={this.state.email}
        />
        <br />

        <Text
          id="name"
          label="Name"
          onChange={this._onChangeInput}
          required
          size={2 * widthBase}
          value={this.state.name}
        />
        <Text
          id="dob"
          label="Date of Birth"
          onChange={this._onChangeInput}
          placeholder="mm/dd/yyyy"
          size={1 * widthBase}
          value={this.state.dob}
        />
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
        <Text
          id="zip"
          label="ZIP Code"
          onChange={this._onChangeInput}
          required
          size={Math.floor(0.8 * widthBase)}
          value={this.state.zip}
        />
        <br />

        <Text
          id="mobilePhone"
          label="Mobile Phone"
          onChange={this._onChangeInput}
          size={1 * widthBase}
          value={this.state.mobilePhone}
        />
        <Text
          id="homePhone"
          label="Home Phone"
          onChange={this._onChangeInput}
          size={1 * widthBase}
          value={this.state.homePhone}
        />
        <br />

        <Checklist
          checklistItems={[
            {
              label: 'Teacher',
              value: 'teacher',
              checked: this.state.teacher
            },
            {
              label: 'Administrative Staff',
              value: 'admin',
              checked: this.state.admin
            },
            {
              label: 'Class Assistant/Hallway Monitor',
              value: 'assistantMentor',
              checked: this.state.assistantMentor
            },
            {
              label: 'Kitchen Staff',
              value: 'kitchen',
              checked: this.state.kitchen
            },
            {
              label: 'Other',
              value: 'showOther',
              checked: this.state.showOther
            }
          ]}
          id="role"
          label="I am interested in volunteering in the role of:"
          onChange={this._onChangeInput}
        />
        <br />

        {this.state.showOther && (
          <Text
            id="otherText"
            label="Other Role"
            onChange={this._onChangeInput}
            size={1 * widthBase}
            value={this.state.otherText}
          />
        )}
        <Checklist
          checklistItems={[
            {
              label: 'Sunday School',
              value: 'sundaySchool',
              checked: this.state.sundaySchool
            },
            {
              label: 'Vacation Bible School',
              value: 'bibleSchool',
              checked: this.state.bibleSchool
            },
            {
              label: 'Youth Ministory',
              value: 'youthMinistry',
              checked: this.state.youthMinistry
            }
          ]}
          id="past-volunteer-area"
          label="Select areas that you have volunteered for at City Temple in the past"
          onChange={this._onChangeInput}
        />
        <Checklist
          checklistItems={[
            {
              label: 'Teacher',
              value: 'pastTeacher',
              checked: this.state.pastTeacher
            },
            {
              label: 'Administrative Staff',
              value: 'pastAdmin',
              checked: this.state.pastAdmin
            },
            {
              label: 'Transition Team',
              value: 'pastTransition',
              checked: this.state.pastTransition
            },
            {
              label: 'Kitchen Staff',
              value: 'pastKitchen',
              checked: this.state.pastKitchen
            },
            {
              label: 'Chaperon',
              value: 'pastChaperone',
              checked: this.state.pastChaperone
            }
          ]}
          id="past-volunteer-role"
          label="Your role:"
          onChange={this._onChangeInput}
        />
        <br />

        {this.props.askAvailability && (
          <div>
            <Checklist
              checklistItems={[
                {
                  label: 'M',
                  value: 'monday',
                  checked: this.state.monday
                },
                {
                  label: 'T',
                  value: 'tuesday',
                  checked: this.state.tuesday
                },
                {
                  label: 'W',
                  value: 'wednesday',
                  checked: this.state.wednesday
                },
                {
                  label: 'Th',
                  value: 'thursday',
                  checked: this.state.thursday
                },
                {
                  label: 'F',
                  value: 'friday',
                  checked: this.state.friday
                }
              ]}
              horizontal
              id="available-day"
              label="Availability:"
              onChange={this._onChangeInput}
            />

            <br />
          </div>
        )}
        <Button onClick={this._validateAndSubmit}>Submit</Button>
      </div>
    );
  }

  _makeSubGroup(id, fieldIds, header) {
    const items = fieldIds.reduce((items, fieldId) => {
      if (this.state[fieldId]) {
        items.push(
          <li key={fieldId}>
            <span>{FIELDS_INFO[fieldId].label}</span>
          </li>
        );
      }
      return items;
    }, []);

    // add the otherText data in the summary with the roles
    const fieldId = 'otherText';
    if (id === 'roles' && this.state[fieldId]) {
      items.push(
        <li key={fieldId}>
          <span>{this.state[fieldId]}</span>
        </li>
      );
    }

    return (
      Boolean(items.length) && (
        <div className="check-list-summary" key={id}>
          <br />
          {header}
          {items}
        </div>
      )
    );
  }

  _renderSummaryModal() {
    let fieldSummaryItems = _.values(FIELDS_INFO).reduce((items, field) => {
      const {fieldId, label} = field;
      const value = this.state[fieldId];

      // make sure otherText doesn't show up with the other text fields
      if (value && typeof value === 'string' && fieldId !== 'otherText') {
        items.push(
          <li key={fieldId}>
            <span className="bold">{label}</span>: {value}
          </li>
        );
      }

      return items;
    }, []);

    const groupFields = {
      roles: ['teacher', 'admin', 'assistantMentor', 'kitchen'],
      pastGroups: ['sundaySchool', 'bibleSchool', 'youthMinistry'],
      pastRoles: [
        'pastTeacher',
        'pastAdmin',
        'pastTransition',
        'pastKitchen',
        'pastChaperone'
      ],
      availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    };

    fieldSummaryItems = fieldSummaryItems.concat(
      this._makeSubGroup('roles', groupFields.roles, 'Roles volunteering for:'),
      this._makeSubGroup(
        'pastGroups',
        groupFields.pastGroups,
        'Areas volunteered for in the past:'
      ),
      this._makeSubGroup(
        'pastRoles',
        groupFields.pastRoles,
        'Roles volunteered for in the past:'
      ),
      this._makeSubGroup(
        'available-days',
        groupFields.availability,
        'Available Days'
      )
    );

    return (
      <Modal className="registration-modal" onCloseClick={this._toggleModal}>
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
    const modal =
      showModal && postStatus !== 'failure' && this._renderSummaryModal();

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

BaseRegistrationChild.defaultProps = {
  askAvailability: false
};

BaseRegistrationChild.propTypes = {
  askAvailability: PropTypes.bool,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  refName: PropTypes.string.isRequired
};

export default BaseRegistrationChild;
