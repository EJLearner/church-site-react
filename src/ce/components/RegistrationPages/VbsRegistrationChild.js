import React, {Component} from 'react';

import BaseRegistrationChild from './BaseRegistrationChild';

class VbsRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1 className="vbs-header">Vacation Bible School</h1>
        <h2 className="vbs-header">Child Registration</h2>
        <p>
          Complete the following form to register your child(ren) for Vacation
          Bible School. For timely enrollment, please double-check your
          responses before clicking the <span className="bold">Submit</span>{' '}
          button.
        </p>
      </div>
    );
  }

  render() {
    return (
      <BaseRegistrationChild
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName="vbsRegistered"
      />
    );
  }
}

export default VbsRegistrationChild;
