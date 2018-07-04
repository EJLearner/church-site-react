import React, {Component} from 'react';
import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import commonUtils from '../../../utils/commonUtils';
import {CHILD_STATUS} from '../CcVbsCheckinOut/BaseCheckinOutConstants';
import Table from '../Reusable/Table/Table';

class VbsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenTableRows: [],
      volunteerTableRows: []
    };
  }

  componentDidMount() {
    this.convertFbObjectToState(
      `${this.props.stringPrefix}RegisteredVolunteers`,
      'volunteerTableRows',
      this._generateVolunteerRowObject
    );

    this.convertFbObjectToState(
      `${this.props.stringPrefix}RegisteredChildren`,
      'childrenTableRows',
      this._generateChildRowObject
    );

    this.convertFbObjectWithSubObjectsToState(
      `${this.props.stringPrefix}Logbook`,
      'checkinTableRows',
      this._generateCheckinRowObject,
      true
    );
  }

  convertFbObjectToState(refPath, stateName, generateRowObject) {
    firebase
      .database()
      .ref(refPath)
      .on('value', snapshot => {
        const tableRows = this.getRowsFromSnapshot(
          snapshot,
          generateRowObject,
          this
        );
        this.setState({[stateName]: tableRows});
      });
  }

  convertFbObjectWithSubObjectsToState(refPath, stateName, generateRowObject) {
    firebase
      .database()
      .ref(refPath)
      .on('value', snapshot => {
        const props = {};

        snapshot.forEach(snapshotItem => {
          const key = `${stateName}-${snapshotItem.key}`;
          const tableRows = this.getRowsFromSnapshot(
            snapshotItem,
            generateRowObject,
            this
          );

          props[key] = tableRows;
        });

        this.setState(props);
      });
  }

  getRowsFromSnapshot(snapshot, generateRowObject, instance) {
    const tableRows = [];
    snapshot.forEach(snapshotItem => {
      const object = snapshotItem.val();
      tableRows.push(
        generateRowObject.bind(instance)(snapshotItem.key, object)
      );
    });

    return tableRows;
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

  _generateVolunteerRowObject(key, volunteerObject) {
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
      id: key,
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
      updateTime: commonUtils.formatTime(volunteerObject.timeChanged)
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

  _generateChildRowObject(key, childObject) {
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
      id: key,
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
      age: commonUtils.getAge(childDob),
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
      {label: 'Age', name: 'age'}
    ];
  }

  _generateCheckinRowObject(key, checkinObject) {
    return {
      id: key,
      childName: checkinObject.childName,
      status:
        checkinObject.status === CHILD_STATUS.CHECKED_IN
          ? 'Checked In'
          : 'Checked Out',
      parentName: checkinObject.parentName,
      age: commonUtils.getAge(checkinObject.childDob),
      allergies: checkinObject.knownAllergies,
      parentEmail: checkinObject.parentEmail,
      parentPhone: commonUtils.formatPhoneNumber(
        checkinObject.parentPhone,
        true
      ),
      checkInTime: commonUtils.formatTime(checkinObject.checkInTime),
      checkOutTime: commonUtils.formatTime(checkinObject.checkOutTime)
    };
  }

  _getCheckinTableColumns() {
    return [
      {label: 'Child Name', name: 'childName'},
      {label: 'Parent Name', name: 'parentName'},
      {label: 'Age', name: 'age'},
      {label: 'Allergies', name: 'allergies'},
      {label: 'Parent Email', name: 'parentEmail'},
      {label: 'Parent Phone', name: 'parentPhone'},
      {label: 'Status', name: 'status'},
      {label: 'Check In Time', name: 'checkInTime'},
      {label: 'Check Out Time', name: 'checkOutTime'}
    ];
  }

  render() {
    return (
      // TODO: Make dropdown that has user switch from one
      // sign in date to another instead of listing all of them

      <div>
        <h2>Volunteers</h2>
        <Table
          columns={this._getVolunteerTableColumns()}
          rows={this.state.volunteerTableRows}
        />
        <h2>Children</h2>
        <Table
          columns={this._getChildrenTableColumns()}
          rows={this.state.childrenTableRows}
        />
        <h2>Sign In</h2>
        {Object.keys(this.state).reduce((tables, stateName) => {
          if (stateName.includes('checkinTableRows')) {
            tables.push(
              <Table
                columns={this._getCheckinTableColumns()}
                key={stateName}
                rows={this.state[stateName] || []}
              />
            );
          }

          return tables;
        }, [])}
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
