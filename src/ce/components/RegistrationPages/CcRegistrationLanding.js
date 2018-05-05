import React, {Component} from 'react';
import {Redirect} from 'react-router';

import BaseRegistrationLanding from './BaseRegistrationLanding.js';

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
      <BaseRegistrationLanding
        imgPath={leftPicture}
        onClickAttend={this._setPageState.bind(null, 'cc-registration-child')}
        onClickVolunteer={this._setPageState.bind(
          null,
          'cc-registration-volunteer'
        )}
        type={BaseRegistrationLanding.TYPES.CHILDRENS_CHURCH}
      />
    );
  }
}

export default CcRegistrationLanding;
