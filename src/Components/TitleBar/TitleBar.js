import React, {Component} from 'react';

import LoginControl from '../LoginControl/LoginControl'
import styles from './TitleBar.css';

class TitleBar extends Component {
  render() {
    return (
    <div id='titlebar'>
      <div id="website-title">The City Temple of Baltimore (Baptist) Christian Education Ministry</div>
      <LoginControl />
        <a href="mailto:thecitytemple317@comcast.net">
          <i className='fa fa-envelope' title="Email City Temple"></i>
        </a>
    </div>
    );
  }
}

export default TitleBar;
