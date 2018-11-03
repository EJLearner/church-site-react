import React, {Component} from 'react';
import {Redirect} from 'react-router';

import routePaths from '../../../routePaths';

import BaseRegistrationLanding from './BaseRegistrationLanding.js';

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
      return <Redirect push to={this.state.redirect} />;
    }

    return (
      <BaseRegistrationLanding
        imgPath={leftPicture}
        onClickAttend={this._setPageState.bind(
          null,
          routePaths.CE_CC_REG_STUDENT
        )}
        onClickVolunteer={this._setPageState.bind(
          null,
          routePaths.CE_VBS_REG_VOLUNTEER
        )}
        type={BaseRegistrationLanding.TYPES.VACATION_BIBLE}
      />
    );
  }
}

export default VbsRegistrationLanding;
