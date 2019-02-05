import React, {Component} from 'react';
import {Redirect} from 'react-router';

import routePaths from '../../../routePaths';

import BaseRegistrationLanding from './BaseRegistrationLanding.js';

import leftPicture from './vbsregpicture.png';

class VbsRegistrationLanding extends Component {
  state = {};

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
        onClickAdultAttend={() =>
          this._setPageState(routePaths.CE_VBS_REG_ADULT)
        }
        onClickChildAttend={() =>
          this._setPageState(routePaths.CE_VBS_REG_CHILD)
        }
        onClickVolunteer={() =>
          this._setPageState(routePaths.CE_VBS_REG_VOLUNTEER)
        }
        type={BaseRegistrationLanding.TYPES.VACATION_BIBLE}
      />
    );
  }
}

export default VbsRegistrationLanding;
