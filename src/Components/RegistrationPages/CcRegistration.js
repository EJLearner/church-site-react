import React, {Component} from 'react';

import Checklist from '../Reusable/Checklist/Checklist';
import Textbox from '../Reusable/Textbox/Textbox';

import fieldValidators from './fieldValidators';
import {post} from 'jquery';

import './CcRegistration.css';

class CcRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = this._getFreshState();

    this._onChangeInput = this._onChangeInput.bind(this);
    this._submitDataClick = this._submitDataClick.bind(this);
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
      'assistant-mentor': false,
      kitchen: false,
      'sunday-school': false,
      'bible-school': false,
      youthMinistry: false,
      'past-teacher': false,
      'past-admin': false,
      transition: false,
      'past-kitchen': false,
      'past-chaperone': false,

      /*
      // datafortesting
      email: 'sjdf@sldkfjsd.com',
      name: 'sdfsddsd',
      dob: '01/01/2012',
      address1: 'sdfsd',
      address2: '',
      city: 'sdfsd',
      state: 'sdfsd',
      zip: '20000',
      mobile: '000-000-0000',
      home: '000-000-0000',
      teacher: true,
      admin: true,
      'assistant-mentor': true,
      kitchen: true,
      'sunday-school': true,
      'bible-school': true,
      youthMinistry: true,
      'past-teacher': true,
      'past-admin': true,
      transition: true,
      'past-kitchen': true,
      'past-chaperone': true,
      */

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

    return <ul>{errorList}</ul>;
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
      assistantMentor: this.state['assistant-mentor'],
      kitchen: this.state.kitchen,
      sundaySchool: this.state['sunday-school'],
      bibleSchool: this.state['bible-school'],
      youthMinistry: this.state.youthMinistry,
      pastTeacher: this.state['past-teacher'],
      pastAdmin: this.state['past-admin'],
      transition: this.state.transition,
      pastKitchen: this.state['past-kitchen'],
      pastChaperone: this.state['past-chaperone']
    };

    post(
      'ccRegistrationFormProcess.php',
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

  _submitDataClick() {
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
        <h2>Volunteer Registration</h2>
        {this._renderErrors(this.state.errors)}
        <div>
          <Textbox
            id={'email'}
            label="Email Address"
            onChange={this._onChangeInput}
            size="20"
            value={this.state.email}
          />
        </div>
        <div>
          <Textbox
            id={'name'}
            label="Name"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.name}
          />
          <Textbox
            id={'dob'}
            label="Date of Birth"
            onChange={this._onChangeInput}
            required
            size="10"
            value={this.state.dob}
          />
        </div>
        <div>
          <Textbox
            id={'address1'}
            label="Address Line 1"
            onChange={this._onChangeInput}
            required
            size="40"
            value={this.state.address1}
          />
        </div>
        <div>
          <Textbox
            id={'address2'}
            label="Address Line 2"
            onChange={this._onChangeInput}
            size="40"
            value={this.state.address2}
          />
        </div>
        <div>
          <Textbox
            id={'city'}
            label="City"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.city}
          />
          <Textbox
            id={'state'}
            label="State"
            onChange={this._onChangeInput}
            required
            size="20"
            value={this.state.state}
          />
          <Textbox
            id={'zip'}
            label="ZIP Code"
            onChange={this._onChangeInput}
            required
            size="8"
            value={this.state.zip}
          />
        </div>
        <div>
          <Textbox
            id={'mobile'}
            label="Mobile Phone"
            onChange={this._onChangeInput}
            size="10"
            value={this.state.mobile}
          />
          <Textbox
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
              value: 'assistant-mentor',
              checked: this.state['assistant-mentor']
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
                value: 'sunday-school',
                checked: this.state['sunday-school']
              },
              {
                label: 'Vacation Bible School',
                value: 'bible-school',
                checked: this.state['bible-school']
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
                value: 'past-teacher',
                checked: this.state['past-teacher']
              },
              {
                label: 'Administrative Staff',
                value: 'past-admin',
                checked: this.state['past-admin']
              },
              {
                label: 'Transition Team',
                value: 'transition',
                checked: this.state['transition']
              },
              {
                label: 'Kitchen Staff',
                value: 'past-kitchen',
                checked: this.state['past-kitchen']
              },
              {
                label: 'Chaperon',
                value: 'past-chaperone',
                checked: this.state['past-chaperone']
              }
            ]}
            id="past-volunteer-role"
            label="Your role:"
            onChange={this._onChangeInput}
          />
          <div>
            <button onClick={this._submitDataClick}>Submit</button>
            {this._renderStatusMessage()}
          </div>
        </div>
      </div>
    );
  }
}

export default CcRegistration;
