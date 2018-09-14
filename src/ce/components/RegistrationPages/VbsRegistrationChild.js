import React, {Component} from 'react';

import BaseRegistrationChild from './BaseRegistrationChild';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';

class VbsRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Child Registration</h2>
        <p>
          Complete the following form to register your child(ren) for Vacation
          Bible School. For timely enrollment, please double-check your
          responses before clicking the <span className="bold">Submit</span>{' '}
          button.
        </p>
      </div>
    );
  }

  render() {
    const vbsYear = utils.getVbsDbYear();

    return (
      <BaseRegistrationChild
        childIdPropName={constants.VBS_REGISTERED_CHILD_ID_PROP}
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName={`${constants.VBS_REGISTERED_CHILDREN_REF_NAME}/${vbsYear}`}
        routePath={routePaths.CE_VBS_REG_CHILD}
      />
    );
  }
}

export default VbsRegistrationChild;
