import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import CcVbsAdminBase from './CcVbsAdminBase';

class CcAdmin extends Component {
  render() {
    return <CcVbsAdminBase stringPrefix="cc" />;
  }
}

export default withRouter(CcAdmin);
