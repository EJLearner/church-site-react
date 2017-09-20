import React, {Component} from 'react';

import Checklist from '../Reusable/Checklist/Checklist';
import Textbox from '../Reusable/Textbox/Textbox';

import './CcRegistration.css';

class CcRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      'past-chaperone': false
    };

    this._onChangeTextbox = this._onChangeTextbox.bind(this);
    this._onChangeCheckbox = this._onChangeCheckbox.bind(this);
  }

  _onChangeTextbox(value, id) {
    this.setState({[id]: value});
  }

  _onChangeCheckbox(value, id) {
    this.setState({[id]: value});
  }

  render() {
    return (
      <div className="registration-page">
        <h1>Children’s Church</h1>
        <h2>Pilot Program Registration</h2>
        <div>
          <Textbox
            id={'email'}
            label="Email Address"
            onChange={this._onChangeTextbox}
            size="20"
            value={this.state.email}
          />
        </div>
        <div>
          <Textbox
            id={'name'}
            label="Name"
            onChange={this._onChangeTextbox}
            required
            size="20"
            value={this.state.name}
          />
          <Textbox
            id={'dob'}
            label="Date of Birth"
            onChange={this._onChangeTextbox}
            required
            size="10"
            value={this.state.dob}
          />
        </div>
        <div>
          <Textbox
            id={'address1'}
            label="Address Line 1"
            onChange={this._onChangeTextbox}
            required
            size="40"
            value={this.state.address1}
          />
        </div>
        <div>
          <Textbox
            id={'address2'}
            label="Address Line 2"
            onChange={this._onChangeTextbox}
            size="40"
            value={this.state.address2}
          />
        </div>
        <div>
          <Textbox
            id={'city'}
            label="City"
            onChange={this._onChangeTextbox}
            required
            size="20"
            value={this.state.city}
          />
          <Textbox
            id={'state'}
            label="State"
            onChange={this._onChangeTextbox}
            required
            size="20"
            value={this.state.state}
          />
          <Textbox
            id={'zip'}
            label="ZIP Code"
            onChange={this._onChangeTextbox}
            required
            size="8"
            value={this.state.zip}
          />
        </div>
        <div>
          <Textbox
            id={'mobile'}
            label="Mobile Phone"
            onChange={this._onChangeTextbox}
            size="10"
            value={this.state.mobile}
          />
          <Textbox
            id={'home'}
            label="Home Phone"
            onChange={this._onChangeTextbox}
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
          onChange={this._onChangeCheckbox}
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
            onChange={this._onChangeCheckbox}
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
            onChange={this._onChangeCheckbox}
          />
        </div>
      </div>
    );
  }
}

export default CcRegistration;
