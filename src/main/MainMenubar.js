import React from 'react';
import {Link} from 'react-router-dom';
import routePaths from '../../src/routePaths';

import './MainMenubar.css';

class MainMenubar extends React.Component {
  render() {
    const menuItems = [
      {text: 'Home', path: routePaths.MAIN_HOME},
      {text: 'Newcomers', path: routePaths.MAIN_NEWCOMERS},
      {text: 'Our Story', path: routePaths.MAIN_OUR_STORY},
      {text: 'Ministries', path: routePaths.MAIN_MINISTRIES},
      {text: 'Connect with us', path: routePaths.MAIN_CONNECT},
      {text: 'Donate', path: routePaths.MAIN_DONATE}
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
