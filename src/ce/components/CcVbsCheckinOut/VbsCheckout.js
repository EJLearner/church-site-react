import React, {Component} from 'react';
import BaseCheckout from './BaseCheckout';

class VbsCheckout extends Component {
  render() {
    return (
      <BaseCheckout
        logbookRefName="vbsLogbook"
        registryAccessRefName="user_groups/vbsRegAccess"
        registryIdName="vbsRegisteredId"
        welcomeName="Vacation Bible School"
      />
    );
  }
}

export default VbsCheckout;
