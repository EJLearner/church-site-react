import React, {Component} from 'react';
import {Redirect} from 'react-router';

import RegistrationLanding from './RegistrationLanding.js';

import leftPicture from './vbsregpicture.png';

class VbsRegistrationLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._setPageState = this._setPageState.bind(this);
  }

  _setPageState(path) {
    this.setState({redirect: path});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/' + this.state.redirect} />;
    }

    return (
      <RegistrationLanding
        imgPath={leftPicture}
        onClickAttend={this._setPageState.bind(null, 'vbs-registration-child')}
        onClickVolunteer={this._setPageState.bind(
          null,
          'vbs-registration-volunteer'
        )}
        type={RegistrationLanding.TYPES.VACATION_BIBLE}
      />
    );
  }
}

export default VbsRegistrationLanding;
