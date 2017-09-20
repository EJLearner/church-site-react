import React, {Component} from 'react';
import {Redirect} from 'react-router';

import RegistrationLanding from './RegistrationLanding.js';

import leftPicture from './ccregpicture.png';

class CcRegistrationLanding extends Component {
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
        onClickAttend={this._setPageState.bind(null, 'cc-registration')}
        onClickVolunteer={this._setPageState.bind(null, 'cc-volunteer')}
        type={RegistrationLanding.TYPES.CHILDRENS_CHURCH}
      />
    );
  }
}

export default CcRegistrationLanding;
