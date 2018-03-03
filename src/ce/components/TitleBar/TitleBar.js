import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import routePaths from '../../../routePaths';

import LoginControl from '../LoginControl/LoginControl';

import './TitleBar.css';

class TitleBar extends Component {
  render() {
    return (
      <div id="titlebar">
        <div id="website-title">
          <Link to={routePaths.CE_HOME}>
            The City Temple of Baltimore (Baptist) Christian Education Ministry
          </Link>
        </div>
        <LoginControl />
        <a href="mailto:thecitytemple317@comcast.net">
          <i className="fa fa-envelope" title="Email City Temple" />
        </a>
      </div>
    );
  }
}

export default TitleBar;
