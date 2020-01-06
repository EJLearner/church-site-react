import React from 'react';
import {Link} from 'react-router-dom';
import routePaths from '../../src/routePaths';

import logo from '../assets/main/images/logo-ct-circle-white-cropped.png';

import './MainMenubar.css';

const MainMenubar = () => {
  const menuItems = [
    {text: 'Home', path: routePaths.MAIN_HOME},
    {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
    {text: 'Ministries', path: routePaths.MAIN_MINISTRIES},
    {text: 'Giving', path: routePaths.MAIN_GIVING},
    {text: 'Church Calendar', path: routePaths.MAIN_CALENDAR},
    {text: 'Members Only', path: routePaths.MAIN_MEMBERS_ONLY},
    {text: 'Contact', path: routePaths.MAIN_CONTACT}
  ];

  const renderedMenuItems = menuItems.map(({text, path}) => {
    return (
      <div className="main-menu-item" key={text}>
        <Link to={path}>{text}</Link>
      </div>
    );
  });

  return (
    <>
      <div className="main-top-title">
        <div>
          <img alt="City Temple Church Logo" height="115px" src={logo} />
        </div>
        <div className="ct-title-text">
          The City Temple of Baltimore (Baptist)
        </div>
      </div>
      <div className="main-menu-bar">{renderedMenuItems}</div>
    </>
  );
};

export default MainMenubar;
