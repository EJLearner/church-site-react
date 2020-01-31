import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS, WIDTHS, COLORS} from '../../utils/styleVariables';
import ContentSelectBoxes from './ContentSelectBoxes';
import {contentSelectInfo} from './mainPageData';
import AnnouncementBox from '../commonComponents/AnnouncementBox';
import NewsAndEvents from './NewsAndEvents';

const StyledMainTextAndNews = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const StyledAnnouncementBoxWrapper = styled.div`
  margin: 0 0 2em 0;
  width: 50%;
`;

const StyledContentComponentWrapper = styled.div`
  height: 300px;
  overflow-y: auto;
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

function MainContent() {
  const [contentIndex, setContentIndex] = useState(0);

  const currentContent = contentSelectInfo[contentIndex];
  const ContentComponent = currentContent.render;

  return (
    <div>
      <MainMenubar />
      <StyledMainTextAndNews>
        <StyledAnnouncementBoxWrapper>
          <AnnouncementBox>
            <StyledContentComponentWrapper>
              <ContentComponent />
            </StyledContentComponentWrapper>
            <ArrowAndLearnmore>
              <ArrowBox>
                <FontAwesomeIcon icon={faAngleRight} size="2x" />
              </ArrowBox>
              <LearnMoreBox>
                <Link to={currentContent.linkPath}>Learn more</Link>
              </LearnMoreBox>
            </ArrowAndLearnmore>
          </AnnouncementBox>
        </StyledAnnouncementBoxWrapper>
        <NewsAndEvents />
      </StyledMainTextAndNews>
      <ContentSelectBoxes
        contentIndex={contentIndex}
        onContentSelect={index => setContentIndex(index)}
      />
    </div>
  );
}

export default MainContent;
