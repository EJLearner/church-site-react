import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../../src/routePaths';
import logo from '../assets/main/images/logo-ct-circle-white-cropped.png';
import {LOGICAL_COLORS, WIDTHS, FONT_FAMILIES} from '../utils/styleVariables';

import getAnnouncementsContentArray from './MainPage/AnnouncementsContent/getAnnouncementsContentArray';

const hasAnnouncements = getAnnouncementsContentArray().length;

const mainMenuItems = [
  {text: 'Home', path: routePaths.MAIN_HOME},
  {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
  {text: 'Giving', path: routePaths.MAIN_GIVING},
  {text: 'Watch', path: routePaths.MAIN_WATCH},
  {text: 'Church Calendar', path: routePaths.MAIN_CALENDAR},
  {text: 'Contact', path: routePaths.MAIN_CONTACT},
  hasAnnouncements && {
    text: 'Announcements',
    path: routePaths.MAIN_ANNOUNCEMENTS
  }
].filter(Boolean);

const StyledHeader = styled.header`
  font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
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
  background-color: rgba(0, 0, 0, 0.7);
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
    text-decoration: none;
    color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainMenubar = ({menuItems = mainMenuItems}) => {
  const renderedMenuItems = menuItems.map(({hash = '', text, path}) => {
    return (
      <div className="main-menu-item" key={text}>
        <Link to={path + hash}>{text}</Link>
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

MainMenubar.propTypes = {
  menuItems: PropTypes.array
};

export default MainMenubar;
