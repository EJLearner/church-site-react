import React from 'react';
import {Link} from 'react-router-dom';
import routePaths from '../../src/routePaths';

import './MainMenubar.css';

class MainMenubar extends React.Component {
  render() {
    const menuItems = [
      {text: 'Home', path: routePaths.MAIN_HOME},
      {text: 'Newcomers', path: routePaths.MAIN_HOME},
      {text: 'Our Story', path: routePaths.MAIN_HOME},
      {text: 'Ministries', path: routePaths.MAIN_HOME},
      {text: 'Connect with us', path: routePaths.MAIN_HOME},
      {text: 'Donate', path: routePaths.MAIN_HOME}
    ];

    const renderedMenuItems = menuItems.map(itemInfo => {
      return (
        <div className="main-menu-item" key={itemInfo.text}>
          <Link to={itemInfo.path}>{itemInfo.text}</Link>
        </div>
      );
    });

    return <div className="main-menu-bar">{renderedMenuItems}</div>;
  }
}

export default MainMenubar;
