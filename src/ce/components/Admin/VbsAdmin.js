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
        tableRows.push({
          id: childSnapShot.key,
          name: volunteerObject.name,
          homePhone: commonUtils.formatPhoneNumber(volunteerObject.homePhone),
          mobilePhone: commonUtils.formatPhoneNumber(
            volunteerObject.mobilePhone
          ),
          email: volunteerObject.email,
          address: (
            <div>
              {volunteerObject.address1}
              {Boolean(volunteerObject.address2) && (
                <div>{volunteerObject.address2}</div>
              )}
              <div>
                {volunteerObject.city}, {volunteerObject.state}{' '}
                {volunteerObject.zip}
              </div>
            </div>
          ),
          availability: this._getDaysAvailableString(volunteerObject)
        });
      });

      this.setState({tableRows});
    });
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
      {label: 'Availability', name: 'availability'}
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
