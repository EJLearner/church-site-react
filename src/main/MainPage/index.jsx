import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import churchExterior from '../../assets/main/images/church-exterior.png';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS, WIDTHS, COLORS} from '../../utils/styleVariables';
import ScrollingEventsText from './ScrollingEventsText';
import ContentSelectBoxes from './ContentSelectBoxes';
import {contentSelectInfo} from './mainPageData';
import AnnouncementBox from '../commonComponents/AnnouncementBox';

const StyledAnnouncementBoxWrapper = styled.div`
  margin: 0 0 0 ${WIDTHS.SIDE_CONTENT_PADDING};
  width: 50%;
`;

const StyledContentComponentWrapper = styled.div`
  height: 300px;
  overflow-y: auto;
`;

const MenuBarAndPictureDiv = styled.div`
  background-image: url(${churchExterior});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ArrowAndLearnmore = styled.div`
  display: inline-flex;
  align-items: stretch;
`;

const ArrowBox = styled.div`
  background-color: ${LOGICAL_COLORS.CT_ACCENT};
  color: ${LOGICAL_COLORS.CT_PRIMARY}
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.5em;
`;

const LearnMoreBox = styled.div`
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  display: inline-flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  padding: 0 0.5em;
  text-transform: uppercase;

  a {
    color: ${COLORS.WHITE};
  }
`;

const UpcomingEvents = styled.div`
  align-items: center;
  background-color: ${LOGICAL_COLORS.CT_SECOND};
  display: flex;
  padding: 32px ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const SaveTheDate = styled.div`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  font-size: 200%;
  font-weight: bold;
  text-transform: uppercase;
`;

function MainContent() {
  const [contentIndex, setContentIndex] = useState(0);

  const currentContent = contentSelectInfo[contentIndex];
  const ContentComponent = currentContent.render;

  return (
    <>
      <MenuBarAndPictureDiv className="menu-bar-and-picture">
        <MainMenubar />
        <StyledAnnouncementBoxWrapper>
          <AnnouncementBox>
            <StyledContentComponentWrapper>
              <ContentComponent />
            </StyledContentComponentWrapper>
            <ArrowAndLearnmore>
              <ArrowBox>
                <div>
                  <FontAwesomeIcon icon={faAngleRight} size="2x" />
                </div>
              </ArrowBox>
              <LearnMoreBox>
                <Link to={currentContent.linkPath}>Learn more</Link>
              </LearnMoreBox>
            </ArrowAndLearnmore>
          </AnnouncementBox>
        </StyledAnnouncementBoxWrapper>
      </MenuBarAndPictureDiv>
      <UpcomingEvents>
        <SaveTheDate>Save The Date</SaveTheDate>
        <ScrollingEventsText />
        <ContentSelectBoxes
          contentIndex={contentIndex}
          onContentSelect={index => setContentIndex(index)}
        />
      </UpcomingEvents>
    </>
  );
}

export default MainContent;
