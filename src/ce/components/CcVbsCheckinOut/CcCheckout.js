import React, {Component} from 'react';
import BaseCheckout from './BaseCheckout';

class CcCheckout extends Component {
  render() {
    return (
      <BaseCheckout
        logbookRefName="ccLogbook"
        registryAccessRefName="user_groups/ccRegAccess"
        registryIdName="ccRegisteredId"
        welcomeName="Children’s Church"
      />
    );
  }
}

export default CcCheckout;
