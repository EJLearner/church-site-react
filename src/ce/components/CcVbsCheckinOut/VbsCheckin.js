import React, {Component} from 'react';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';

import BaseCheckin from './BaseCheckin';

class VbsCheckin extends Component {
  render() {
    return (
      <BaseCheckin
        logbookRefName={constants.VBS_LOGBOOK_REF_NAME}
        registerLink={routePaths.CE_VBS_REG_CHILD}
        registeredChildrenRefName={constants.VBS_REGISTERED_CHILDREN_REF_NAME}
        registryAccessRefName={constants.VBS_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.VBS_REGISTERED_CHILD_ID_PROP}
        welcomeName="Vacation Bible School"
      />
    );
  }
}

export default VbsCheckin;
