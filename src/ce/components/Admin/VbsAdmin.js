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

    this.state = {tableRows: []};
  }

  componentDidMount() {
    const volunteersRef = firebase
      .database()
      .ref(`${this.props.stringPrefix}RegisteredVolunteers`);

    volunteersRef.on('value', snapshot => {
      const tableRows = [];

      snapshot.forEach(childSnapShot => {
        const volunteerObject = childSnapShot.val();
        tableRows.push(this._generateRowObject(childSnapShot, volunteerObject));
      });

      this.setState({tableRows});
    });
  }

  _generateRowObject(childSnapShot, volunteerObject) {
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
      id: childSnapShot.key,
      name: volunteerObject.name,
      homePhone: commonUtils.formatPhoneNumber(homePhone),
      mobilePhone: commonUtils.formatPhoneNumber(mobilePhone),
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
      interestedIn: this._generateInterestedInString(volunteerObject)
    };

    /* TODO data

    bibleSchool Vaction Bible School;
    sundaySchool
    youthMinistry

    updateTime
    dob;
    past
      teacher
      admin Administrative Staff
      transition Transition Team
      kitchen Kitchen Staff
      chaperone
    */
  }

  _generateInterestedInString(volunteerObject) {
    return [
      volunteerObject.teacher && 'Teacher',
      volunteerObject.admin && 'Administrative Staff',
      volunteerObject.assistantMentor && 'Assistant/Hallway Monitor',
      volunteerObject.admin && 'Administrative Staff',
      volunteerObject.kitchen && 'Kitchen Staff',
      volunteerObject.otherText
    ]
      .filter(role => role)
      .join(', ');
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

  _getColumns() {
    return [
      {label: 'Name', name: 'name'},
      {label: 'Home Phone', name: 'homePhone'},
      {label: 'Mobile Phone', name: 'mobilePhone'},
      {label: 'Email', name: 'email'},
      {label: 'Address', name: 'address'},
      {label: 'Availability', name: 'availability'},
      {label: 'Interested In', name: 'interestedIn'}
    ];
  }

  render() {
    return (
      <div>
        <h1>Volunteers</h1>
        <Table rows={this.state.tableRows} columns={this._getColumns()} />
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
