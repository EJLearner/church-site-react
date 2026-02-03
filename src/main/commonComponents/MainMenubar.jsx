import PropTypes from 'prop-types';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import Menubar from '../Menubar';

const mainMenuItems = [
  {text: 'Home', path: '/'},
  {text: 'Profile', path: `/${routePaths.MAIN_PROFILE}`},
  {text: 'Meditations', path: `/${routePaths.MAIN_MEDITATIONS}`},
  {text: 'Giving', path: `/${routePaths.MAIN_GIVING}`},
  {text: 'Bible Study', path: `/${routePaths.BIBLE_STUDY}`},
  {text: 'Calendar', path: `/${routePaths.MAIN_CALENDAR}`},
  {text: 'Contact', path: `/${routePaths.MAIN_CONTACT}`},
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- may want this later
const StyledAnnouncementBar = styled.div`
  padding: 0.1em;
  background-color: var(--accent-background);
  color: var(--accent-content);
  font-size: 24px;
  text-align: center;

  .funeral-popout-link,
  .funeral-popout-link:visited {
    cursor: pointer;
    color: var(--accent-content);
  }
`;

function MainMenubar(props) {
  const {imageSource} = props;

  return <Menubar imageSource={imageSource} menuItems={mainMenuItems} />;
}

MainMenubar.propTypes = {
  imageSource: PropTypes.string,
};

export default MainMenubar;
