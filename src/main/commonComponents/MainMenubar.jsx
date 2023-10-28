import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import yearginFuneralImgSrc from '../../assets/images/yeargin-funeral.jpg';
import routePaths from '../../routePaths';
import {isoTimeHasPassed} from '../../utils/dateTimeUtils';
import Menubar from '../Menubar';

import Anchor from './Anchor';

const mainMenuItems = [
  {text: 'Home', path: routePaths.MAIN_HOME},
  {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
  {text: 'Meditations', path: routePaths.MAIN_MEDITATIONS},
  {text: 'Giving', path: routePaths.MAIN_GIVING},
  {text: 'Bible Study', path: routePaths.BIBLE_STUDY},
  {text: 'Calendar', path: routePaths.MAIN_CALENDAR},
  {text: 'Contact', path: routePaths.MAIN_CONTACT}
];

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

  const showYearginFuneralInfo = !isoTimeHasPassed('2023-11-12T16:00:00-05:00');

  return (
    <>
      {showYearginFuneralInfo && (
        <StyledAnnouncementBar>
          <Anchor
            className="funeral-popout-link"
            onClick={() => {
              window.open(
                yearginFuneralImgSrc,
                'name',
                'height=500,width=500,toolbar=no,directories=no,status=no,menubar=no, scrollbars=no,resizable=no'
              );
            }}
            path={yearginFuneralImgSrc}
          >
            Rev Dr. Grady A. Yeargin, Jr. Funeral Information
          </Anchor>
        </StyledAnnouncementBar>
      )}
      <Menubar imageSource={imageSource} menuItems={mainMenuItems} />
    </>
  );
}

MainMenubar.propTypes = {
  imageSource: PropTypes.string
};

export default MainMenubar;
