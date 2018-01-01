import React, {Component} from 'react';

import Button from '../Reusable/Button/Button';
import Checklist from '../Reusable/Checklist/Checklist';
import Text from '../Reusable/Text/Text';

import fieldValidators from './fieldValidators';
import registrationUtils from './registrationUtils';
import {post} from 'jquery';

import './Registration.css';

class CcRegistrationVolunteer extends Component {
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
      email: '',
      name: '',
      dob: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      mobile: '',
      home: '',
      teacher: false,
      admin: false,
      assistantMentor: false,
      kitchen: false,
      sundaySchool: false,
      bibleSchool: false,
      youthMinistry: false,
      pastTeacher: false,
      pastAdmin: false,
      transition: false,
      pastKitchen: false,
      pastChaperone: false,

      errors: []
    };
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _submitData() {
    const data = {
      email: this.state.email,
      name: this.state.name,
      dob: this.state.dob,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      mobile: this.state.mobile,
      home: this.state.home,
      teacher: this.state.teacher,
      admin: this.state.admin,
      assistantMentor: this.state['assistantMentor'],
      kitchen: this.state.kitchen,
      sundaySchool: this.state['sundaySchool'],
      bibleSchool: this.state['bibleSchool'],
      youthMinistry: this.state.youthMinistry,
      pastTeacher: this.state['pastTeacher'],
      pastAdmin: this.state['pastAdmin'],
      transition: this.state.transition,
      pastKitchen: this.state['pastKitchen'],
      pastChaperone: this.state['pastChaperone']
    };

    post(
      'ccRegistrationFormVolunteerProcess.php',
      data,
      response => {
        if (response.success) {
          this._postSubmitSuccess();
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
        id: 'email',
        label: 'Email',
        fieldRules: [fieldValidators.isValidEmail]
      },
      {
        id: 'name',
        label: 'Name',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        id: 'dob',
        label: 'Date of Birth',
        fieldRules: [fieldValidators.isNotEmpty, fieldValidators.isDate]
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
        id: 'mobile',
        label: 'Mobile',
        fieldRules: [fieldValidators.isPhoneNumber]
      },
      {
        id: 'home',
        label: 'Home',
        fieldRules: [fieldValidators.isPhoneNumber]
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
        <div>
          <Text
            id={'email'}
            label="Email Address"
            onChange={this._onChangeInput}
            size="20"
            value={this.state.email}
          />
        </div>
        <div>
          <Text
            id={'name'}
            label="Name"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.name}
          />
          <Text
            id={'dob'}
            label="Date of Birth"
            onChange={this._onChangeInput}
            required
            size="10"
            value={this.state.dob}
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
            id={'city'}
            label="City"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.city}
          />
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
        </div>
        <div>
          <Text
            id={'mobile'}
            label="Mobile Phone"
            onChange={this._onChangeInput}
            size="10"
            value={this.state.mobile}
          />
          <Text
            id={'home'}
            label="Home Phone"
            onChange={this._onChangeInput}
            size="10"
            value={this.state.home}
          />
        </div>
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
              checked: this.state['admin']
            },
            {
              label: 'Class Assistant/Hallway Monitor',
              value: 'assistantMentor',
              checked: this.state['assistantMentor']
            },
            {
              label: 'Kitchen Staff',
              value: 'kitchen',
              checked: this.state['kitchen']
            }
          ]}
          id="role"
          label="I am interested in volunteering in the role of:"
          onChange={this._onChangeInput}
        />
        <div>
          <Checklist
            checklistItems={[
              {
                label: 'Sunday School',
                value: 'sundaySchool',
                checked: this.state['sundaySchool']
              },
              {
                label: 'Vacation Bible School',
                value: 'bibleSchool',
                checked: this.state['bibleSchool']
              },
              {
                label: 'Youth Ministory',
                value: 'youthMinistry',
                checked: this.state['youthMinistry']
              }
            ]}
            id="past-volunteer-area"
            label="Have you volunteered at City Temple before? Check all that apply."
            onChange={this._onChangeInput}
          />
          <Checklist
            checklistItems={[
              {
                label: 'Teacher',
                value: 'pastTeacher',
                checked: this.state['pastTeacher']
              },
              {
                label: 'Administrative Staff',
                value: 'pastAdmin',
                checked: this.state['pastAdmin']
              },
              {
                label: 'Transition Team',
                value: 'transition',
                checked: this.state['transition']
              },
              {
                label: 'Kitchen Staff',
                value: 'pastKitchen',
                checked: this.state['pastKitchen']
              },
              {
                label: 'Chaperon',
                value: 'pastChaperone',
                checked: this.state['pastChaperone']
              }
            ]}
            id="past-volunteer-role"
            label="Your role:"
            onChange={this._onChangeInput}
          />
          <div>
            <Button onClick={this._setErrors}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="registration-page">
        <h1>Children’s Church</h1>
        <h2>Volunteer Registration</h2>
        {registrationUtils.renderErrors(this.state.errors)}
        {this._renderFormFields()}
        {registrationUtils.renderStatusMessage(
          this.state.postStatus,
          this.state.errors
        )}
      </div>
    );
  }
}

export default CcRegistrationVolunteer;
