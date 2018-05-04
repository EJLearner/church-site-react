import React, {Component} from 'react';

import BaseRegistrationChild from './BaseRegistrationChild';

class CcRegistrationChild extends Component {
  _renderHeaderContent() {
    return (
      <div>
        <h1>Children’s Church</h1>
        <h2>Child Registration</h2>
        <p>
          Complete the following form to register your child(ren) for Children’s
          Church. For timely enrollment, please double-check your responses
          before clicking the <span className="bold">Submit</span> button.
        </p>
      </div>
    );
  }

  render() {
    return (
      <BaseRegistrationChild
        className="registration-page"
        headerContent={this._renderHeaderContent()}
        refName="ccRegistered"
      />
    );
  }
}

export default CcRegistrationChild;
