import React, {Component} from 'react';

import BaseCcRegistrationChild from './BaseCcRegistrationChild';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';

class CcRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1>Children’s Church</h1>
        <h2>Child Registration</h2>
        <p>
          Complete the following form to register your child(ren) for Children’s
          Church. For timely enrollment, please double-check your responses
          before clicking the <span className="bold">Submit</span> button.
        </p>
      </div>
    );
  }
  render() {
    const ccYear = utils.getCcDbYear();

    return (
      <BaseCcRegistrationChild
        childIdPropName={constants.CC_REGISTERED_CHILD_ID_PROP}
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName={`${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${ccYear}`}
        routePath={routePaths.CE_CC_REG_CHILD}
      />
    );
  }
}

export default CcRegistrationChild;
