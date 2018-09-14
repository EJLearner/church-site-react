import React, {Component} from 'react';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';
import constants from '../../../utils/constants';
import utils from '../../../utils/commonUtils';

class CcRegistrationVolunteer extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1>Children’s Church</h1>
        <h2>Volunteer Registration</h2>
      </div>
    );
  }

  render() {
    const vbsYear = utils.getVbsDbYear();

    return (
      <BaseRegistrationVolunteer
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName={`${constants.CC_REGISTERED_VOLUNTEER_REF_NAME}/${vbsYear}`}
      />
    );
  }
}

export default CcRegistrationVolunteer;
