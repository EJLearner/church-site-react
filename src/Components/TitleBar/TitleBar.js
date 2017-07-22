import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import LoginControl from '../LoginControl/LoginControl'
import styles from './TitleBar.css';

class TitleBar extends Component {
  render() {
    return (
    <div id='titlebar'>
      <div id="website-title">The City Temple of Baltimore (Baptist) Christian Education Ministry</div>
      <LoginControl />
    </div>
    );
  }
}

export default TitleBar;
