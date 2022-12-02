import PropTypes from 'prop-types';
import React from 'react';

import routePaths from '../../routePaths';
import Menubar from '../Menubar';

const mainMenuItems = [
  {text: 'Home', path: routePaths.MAIN_HOME},
  {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
  {text: 'Meditations', path: routePaths.MAIN_MEDITATIONS},
  {text: 'Giving', path: routePaths.MAIN_GIVING},
  {text: 'Bible Study', path: routePaths.BIBLE_STUDY},
  {text: 'Calendar', path: routePaths.MAIN_CALENDAR},
  {text: 'Contact', path: routePaths.MAIN_CONTACT}
];

function MainMenubar(props) {
  const {imageSource} = props;

  return <Menubar imageSource={imageSource} menuItems={mainMenuItems} />;
}

MainMenubar.propTypes = {
  imageSource: PropTypes.string
};

export default MainMenubar;
