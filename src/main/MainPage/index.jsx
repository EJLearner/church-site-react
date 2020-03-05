import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS, WIDTHS, COLORS} from '../../utils/styleVariables';
import ContentSelectBoxes from './ContentSelectBoxes';
import {contentSelectInfo} from './mainPageData';
import MainTopInfoBox from '../commonComponents/MainTopInfoBox';
import NewsAndEvents from './NewsAndEvents';
import constants from '../../utils/constants';

const StyledMainTextAndNews = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${WIDTHS.SIDE_CONTENT_PADDING};
  padding: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const StyledTopInfoBoxWrapper = styled.div`
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
  font-size: 32px;
  justify-content: center;
  padding: 0.2em 0.4em;

  span {
    height:24px;
    line-height: 18px;
  }
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

const ContentSelectBoxesWrapper = styled.div`
  padding-left: ${WIDTHS.SIDE_CONTENT_PADDING};
  margin-bottom: 3em;
`;

function MainContent() {
  const [contentIndex, setContentIndex] = useState(0);

  const currentContent = contentSelectInfo[contentIndex];
  const ContentComponent = currentContent.render;

  return (
    <div>
      <MainMenubar />
      <StyledMainTextAndNews>
        <StyledTopInfoBoxWrapper>
          <MainTopInfoBox>
            <StyledContentComponentWrapper>
              <ContentComponent />
            </StyledContentComponentWrapper>
            <ArrowAndLearnmore>
              <ArrowBox>
                <span>{constants.SLENDER_ARROW_RIGHT}</span>
              </ArrowBox>
              <LearnMoreBox>
                <Link to={currentContent.linkPath}>Learn more</Link>
              </LearnMoreBox>
            </ArrowAndLearnmore>
          </MainTopInfoBox>
        </StyledTopInfoBoxWrapper>
        <NewsAndEvents />
      </StyledMainTextAndNews>
      <ContentSelectBoxesWrapper>
        <ContentSelectBoxes
          contentIndex={contentIndex}
          onContentSelect={index => setContentIndex(index)}
        />
      </ContentSelectBoxesWrapper>
    </div>
  );
}

export default MainContent;
