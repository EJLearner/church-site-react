import React, {Component} from 'react';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';

import BaseCheckin from './BaseCheckin';
import utils from '../../../utils/commonUtils';

class CcCheckin extends Component {
  render() {
    const ccYear = utils.getCcDbYear();

    return (
      <BaseCheckin
        logbookRefName={constants.CC_LOGBOOK_REF_NAME}
        registerLink={routePaths.CE_CC_REG_CHILD}
        registeredChildrenRefName={`${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${ccYear}`}
        registryAccessRefName={constants.CC_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.CC_REGISTERED_CHILD_ID_PROP}
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckin;
