import React, {Component} from 'react';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';

class VbsRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    return (
      <BaseRegistrationVolunteer
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName="vbsRegisteredVolunteers"
      />
    );
  }
}

export default VbsRegistrationChild;
