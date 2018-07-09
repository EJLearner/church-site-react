import React, {Component} from 'react';
import constants from '../../../utils/constants';

import BaseCheckin from './BaseCheckin';

class CcCheckin extends Component {
  render() {
    return (
      <BaseCheckin
        logbookRefName={constants.CC_LOGBOOK_REF_NAME}
        registeredChildrenRefName={constants.CC_REGISTERED_CHILDREN_REF_NAME}
        registryAccessRefName={constants.CC_REGISTRY_ACCESS_REF_NAME}
        registryIdName={constants.CC_REGISTERED_CHILD_ID_PROP}
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckin;
