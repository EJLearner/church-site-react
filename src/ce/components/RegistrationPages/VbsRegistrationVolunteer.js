import React, {Component} from 'react';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';
import constants from '../../../utils/constants';
import utils from '../../../utils/commonUtils';

class VbsRegistrationVolunteer extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    const vbsYear = utils.getVbsDbYear();

    return (
      <BaseRegistrationVolunteer
        askAvailability
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName={`${constants.VBS_REGISTERED_VOLUNTEER_REF_NAME}/${vbsYear}`}
      />
    );
  }
}

export default VbsRegistrationVolunteer;
