import React, {Component} from 'react';

import BaseRegistrationChild from './BaseRegistrationVolunteer';

class CcRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1>Children’s Church</h1>
        <h2>Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    return (
      <BaseRegistrationChild
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName="ccRegisteredVolunteers"
      />
    );
  }
}

export default CcRegistrationChild;
