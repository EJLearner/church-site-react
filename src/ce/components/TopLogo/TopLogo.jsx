import React, {Component} from 'react';

import churchLogo from './chrisedtopbanner.png';

class TopLogo extends Component {
  render() {
    return (
      <div id="header">
        <div>
          <img alt="" src={churchLogo} />
        </div>
      </div>
    );
  }
}

export default TopLogo;
