import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import commonUtils from '../../../utils/commonUtils';
import Table from '../Reusable/Table/Table';

class VbsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {childrenTableRows: [], volunteerTableRows: []};
  }

  componentDidMount() {
    const volunteersRef = firebase
      .database()
      .ref(`${this.props.stringPrefix}RegisteredVolunteers`);

    const childrenRef = firebase
      .database()
      .ref(`${this.props.stringPrefix}RegisteredChildren`);

    volunteersRef.on('value', snapshot => {
      const volunteerTableRows = [];

      snapshot.forEach(volunteerSnapShot => {
        const volunteerObject = volunteerSnapShot.val();
        volunteerTableRows.push(
          this._generateVolunteerRowObject(volunteerSnapShot, volunteerObject)
        );
      });

      this.setState({volunteerTableRows});
    });

    console.log('bah');

    childrenRef.on('value', snapshot => {
      console.log('evaluating children ref');

      console.log(snapshot.val());

      const childrenTableRows = [];

      snapshot.forEach(childSnapShot => {
        const childObject = childSnapShot.val();
        childrenTableRows.push(
          this._generateChildRowObject(childSnapShot, childObject)
        );
      });

      console.log(childrenTableRows);

      this.setState({childrenTableRows});
    });
  }

  _makeString(keysAndLabels, volunteerObject) {
    return keysAndLabels
      .reduce((strings, [key, label]) => {
        volunteerObject[key] && strings.push(label);
        return strings;
      }, [])
      .join(', ');
  }

  _generateInterestedInString(volunteerObject) {
    const keysAndLabels = [
      ['teacher', 'Teacher'],
      ['admin', 'Administrative Staff'],
      ['assistantMentor', 'Assistant/Hallway Monitor'],
      ['kitchen', 'Kitchen Staff'],
      ['otherText']
    ];

    return this._makeString(keysAndLabels, volunteerObject);
  }

  _generatePastAreaString(volunteerObject) {
    const keysAndLabels = [
      ['bibleSchool', 'Bible School'],
      ['sundaySchool', 'Sunday School'],
      ['youthMinistry', 'Youth Ministry']
    ];

    return this._makeString(keysAndLabels, volunteerObject);
  }

  _generatePastRolesString(volunteerObject) {
    const keysAndLabels = [
      ['pastTeacher', 'Teacher'],
      ['pastAdmin', 'Administrative Staff'],
      ['pastTransition', 'Transition Team'],
      ['pastKitchen', 'Kitchen Staff'],
      ['pastChaperone', 'Chaperone']
    ];

    return this._makeString(keysAndLabels, volunteerObject);
  }

  _getDaysAvailableString(volunteerObject) {
    const days = [
      {key: 'monday', short: 'M'},
      {key: 'tuesday', short: 'T'},
      {key: 'wednesday', short: 'W'},
      {key: 'thursday', short: 'TH'},
      {key: 'friday', short: 'F'}
    ];

    return days.reduce((daysString, day) => {
      if (volunteerObject[day.key]) {
        if (daysString) {
          daysString += '-';
        }
        daysString += day.short;
      }

      return daysString;
    }, '');
  }

  _generateVolunteerRowObject(volunteerSnapShot, volunteerObject) {
    const {
      homePhone,
      mobilePhone,
      email,
      address1,
      address2,
      city,
      state,
      zip
    } = volunteerObject;

    return {
      id: volunteerSnapShot.key,
      name: volunteerObject.name,
      homePhone: commonUtils.formatPhoneNumber(homePhone, true),
      mobilePhone: commonUtils.formatPhoneNumber(mobilePhone, true),
      email: email,
      address: (
        <div>
          {address1}
          {Boolean(address2) && <div>{address2}</div>}
          <div>
            {city}, {state} {zip}
          </div>
        </div>
      ),
      availability: this._getDaysAvailableString(volunteerObject),
      interestedIn: this._generateInterestedInString(volunteerObject),
      pastAreas: this._generatePastAreaString(volunteerObject),
      pastRoles: this._generatePastRolesString(volunteerObject),
      dob: volunteerObject.dob,
      updateTime: volunteerObject.timeChanged
    };
  }

  _getVolunteerTableColumns() {
    return [
      {label: 'Name', name: 'name'},
      {label: 'Home Phone', name: 'homePhone'},
      {label: 'Mobile Phone', name: 'mobilePhone'},
      {label: 'Email', name: 'email'},
      {label: 'Address', name: 'address'},
      {label: 'Availability', name: 'availability'},
      {label: 'Interested In', name: 'interestedIn'},
      {label: 'Past Areas', name: 'pastAreas'},
      {label: 'Past Roles', name: 'pastRoles'},
      {label: 'Update Time', name: 'updateTime'},
      {label: 'DOB', name: 'dob'}
    ];
  }

  _generateChildRowObject(childSnapShot, childObject) {
    const {
      address1,
      address2,
      childDob,
      childName,
      city,
      knownAllergies,
      parentEmail,
      parentName,
      parentPhone,
      state,
      subscribe,
      timeChanged,
      zip
    } = childObject;

    return {
      id: childSnapShot.key,
      childName: childName,
      parentPhone: commonUtils.formatPhoneNumber(parentPhone, true),
      parentEmail: parentEmail,
      parentName: parentName,
      address: (
        <div>
          {address1}
          {Boolean(address2) && <div>{address2}</div>}
          <div>
            {city}, {state} {zip}
          </div>
        </div>
      ),
      allergies: knownAllergies,
      subscribed: subscribe ? 'Yes' : 'No',
      childDob: childDob,
      updateTime: timeChanged
    };
  }

  _getChildrenTableColumns() {
    return [
      {label: 'Child Name', name: 'childName'},
      {label: 'Parent Name', name: 'parentName'},
      {label: 'Parent Phone', name: 'parentPhone'},
      {label: 'Parent Email', name: 'parentEmail'},
      {label: 'Address', name: 'address'},
      {label: 'Known Allergies', name: 'allergies'},
      {label: 'Subscribed', name: 'subscribed'},
      {label: 'Child DOB', name: 'childDob'}
    ];
  }

  render() {
    return (
      <div>
        <h2>Volunteers</h2>
        {/* <Table
          rows={this.state.volunteerTableRows}
          columns={this._getVolunteerTableColumns()}
        /> */}
        <h2>Children</h2>
        <Table
          rows={this.state.childrenTableRows}
          columns={this._getChildrenTableColumns()}
        />
      </div>
    );
  }
}

VbsAdmin.defaultProps = {
  stringPrefix: 'vbs'
};

VbsAdmin.propTypes = {
  stringPrefix: PropTypes.string
};

export default withRouter(VbsAdmin);
