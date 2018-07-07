import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import CcVbsAdminBase from './CcVbsAdminBase';

class VbsAdmin extends Component {
  render() {
    return <CcVbsAdminBase showAvailability stringPrefix="vbs" />;
  }
}

export default withRouter(VbsAdmin);
