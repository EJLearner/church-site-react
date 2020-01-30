import React from 'react';
import {Link} from 'react-router-dom';
import routePaths from '../../src/routePaths';

import logo from '../assets/main/images/logo-ct-circle-white-cropped.png';

import styled from 'styled-components';
import {LOGICAL_COLORS, WIDTHS, FONT_FAMILIES} from '../utils/styleVariables';

const StyledHeader = styled.header`
  margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const StyledMainTopTitle = styled.div`
  align-items: center;
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  display: flex;
  min-height: 3em;
  padding: 0 1em;
  text-transform: uppercase;

  img {
    height: 2em;
  }

  .ct-title-text {
    margin-left: 8px;
  }
`;

const StyledMainMenuBar = styled.nav`
  font-family: ${FONT_FAMILIES.MULI};
  background-color: rgba(0, 0, 0, 0.4);
  margin-bottom: 64px;
  display: flex;
  font-size: 12px;
  text-transform: uppercase;

  & > div {
    margin: 0 16px;
    padding: 16px 8px;
  }

  & > div:first-child {
    margin-left: 0;
    padding-left: 1.3em;
  }

  a {
    color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};
  }
`;

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
    <StyledHeader>
      <StyledMainTopTitle>
        <div>
          <img alt="City Temple Church Logo" height="115px" src={logo} />
        </div>
        <div className="ct-title-text">
          The City Temple of Baltimore (Baptist)
        </div>
      </StyledMainTopTitle>
      <StyledMainMenuBar className="main-menu-bar">
        {renderedMenuItems}
      </StyledMainMenuBar>
    </StyledHeader>
  );
};

export default MainMenubar;
