import React, {Component} from 'react';
import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import moment from 'moment';
import _ from 'lodash';

class VbsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const volunteersRef = firebase
      .database()
      .ref(`${this.props.stringPrefix}RegisteredVolunteers`);

    volunteersRef.on('value', snapshot => {
      const volunteers = snapshot.val();
      this.setState({
        volunteers,
        volunteerSnapShot: snapshot
      });
    });
  }

  _renderVolunteersTableRows(keys) {
    const rows = [];

    this.state.volunteerSnapShot &&
      this.state.volunteerSnapShot.forEach(childSnapShot => {
        const {key} = childSnapShot;
        const volunteer = childSnapShot.val();
        rows.push(
          <tr key={childSnapShot.key}>
            {keys.map(key => {
              return <td key={key}>{volunteer[key]}</td>;
            })}
          </tr>
        );
      });

    return rows;
  }

  _renderVolunteersTable() {
    const keys = ['name', 'homePhone', 'mobilePhone', 'email'];

    return (
      <table>
        <thead>
          <tr>
            {keys.map(key => {
              return <th key={key}>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>{this._renderVolunteersTableRows(keys)}</tbody>
      </table>
    );
  }

  render() {
    console.log(
      this.state.volunteerSnapShot && this.state.volunteerSnapShot.val()
    );

    return (
      <div>
        <h1>Volunteers</h1>
        {this._renderVolunteersTable()}
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
