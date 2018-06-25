import React, {Component} from 'react';

import BaseCheckin from './BaseCheckin';

class CcCheckin extends Component {
  render() {
    return (
      <BaseCheckin
        logbookRefName="vbsLogbook"
        registeredChildrenRefName="vbsRegisteredChildren"
        registryAccessRefName="user_groups/vbsRegAccess"
        registryIdName="vbsRegisteredId"
        welcomeName="Vacation Bible School"
      />
    );
  }
}

export default CcCheckin;
