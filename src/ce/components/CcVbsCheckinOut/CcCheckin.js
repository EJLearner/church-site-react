import React, {Component} from 'react';

import BaseCheckin from './BaseCheckin';

class CcCheckin extends Component {
  render() {
    return (
      <BaseCheckin
        logbookRefName="ccLogbook"
        registeredChildrenRefName="ccRegisteredChildren"
        registryAccessRefName="user_groups/ccRegAccess"
        registryIdName="ccRegisteredId"
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckin;
