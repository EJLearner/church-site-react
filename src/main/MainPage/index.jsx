import React, {useState} from 'react';
import styled from 'styled-components';

import Anchor from '../../common/components/Anchor';
import constants from '../../utils/constants';
import {LOGICAL_COLORS, WIDTHS, COLORS} from '../../utils/styleVariables';
import MainMenubar from '../MainMenubar';
import MainTopInfoBox from '../commonComponents/MainTopInfoBox';

import ContentSelectBoxes from './ContentSelectBoxes';
import NewsAndEvents from './NewsAndEvents';
import {contentSelectInfo} from './mainPageData';

const StyledPage = styled.div`
  .main-text-and-news {
    display: flex;
    justify-content: space-between;
    margin-top: ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
  }

  .top-box-wrapper {
    margin: 0 0 2em 0;
    width: 50%;
  }

  .content-component-wrapper {
    height: 280px;
    overflow-y: auto;
  }

  .arrow-and-learn-more {
    display: inline-flex;
    align-items: stretch;
  }

  .arrow-box {
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
  }

  .learn-more-box {
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
  }

  .content-select-box-wrapper {
    padding-left: ${WIDTHS.SIDE_CONTENT_PADDING};
    margin-bottom: 3em;
  }

`;

function MainContent() {
  const [contentIndex, setContentIndex] = useState(0);

  const {
    learnMoreText = 'Learn More',
    linkPath,
    Component,
    externalLink
  } = contentSelectInfo[contentIndex];

  return (
    <StyledPage>
      <MainMenubar />
      <div className="main-text-and-news">
        <div className="top-box-wrapper">
          <MainTopInfoBox>
            <div className="content-component-wrapper">
              <Component />
            </div>
            <div className="arrow-and-learn-more">
              <div className="arrow-box">{constants.SLENDER_ARROW_RIGHT}</div>
              <div className="learn-more-box">
                <Anchor external={Boolean(externalLink)} path={linkPath}>
                  {learnMoreText}
                </Anchor>
              </div>
            </div>
          </MainTopInfoBox>
        </div>
        <NewsAndEvents />
      </div>
      <div className="content-select-box-wrapper">
        <ContentSelectBoxes
          contentIndex={contentIndex}
          onContentSelect={(index) => setContentIndex(index)}
        />
      </div>
    </StyledPage>
  );
}

export default MainContent;
