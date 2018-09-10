import React, {Component} from 'react';

import BaseRegistrationChild from './BaseRegistrationVolunteer';
import constants from '../../../utils/constants';
import utils from '../../../utils/commonUtils';

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
    const vbsYear = utils.getVbsDbYear();

    return (
      <BaseRegistrationChild
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName={`${constants.CC_REGISTERED_VOLUNTEER_REF_NAME}/${vbsYear}`}
      />
    );
  }
}

export default CcRegistrationChild;
