import React, {useState} from 'react';
import styled from 'styled-components';

import Verse from '../common/components/Verse';
import routePaths from '../routePaths';
import {FONT_FAMILIES} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

const StyleWrapper = styled.div`
  h2 {
    margin-bottom: 0;

    .subtitle {
      display: block;
      font-size: 16px;
      text-transform: none;
    }
  }

  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }
`;

const IDS = {
  MEDITATION: 'meditation',
  VERSES: 'verses'
};

function getVersesContent() {
  return <Verse passage="Isaiah 39.9-40.5" />;
}

const meditationContent = (
  <>
    <h2>
      Weekly Meditation <span className="subtitle">Meditation Title Here</span>
    </h2>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iusto,
      voluptate odio eum nostrum veritatis molestiae alias cumque suscipit
      dolorem ratione ut ipsam placeat odit recusandae! Unde veritatis neque
      impedit.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iusto,
      voluptate odio eum nostrum veritatis molestiae alias cumque suscipit
      dolorem ratione ut ipsam placeat odit recusandae! Unde veritatis neque
      impedit.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iusto,
      voluptate odio eum nostrum veritatis molestiae alias cumque suscipit
      dolorem ratione ut ipsam placeat odit recusandae! Unde veritatis neque
      impedit.
    </p>
  </>
);

const allContentData = [
  {
    getContent: () => meditationContent,
    id: IDS.MEDITATION,
    title: 'Weekly Meditation'
  },
  {
    getContent: getVersesContent,
    id: IDS.VERSES,
    title: 'Weekly Verses'
  }
];

export default function MeditationsPage() {
  const [contentId, setContentId] = useState(allContentData[0].id);

  const {getContent} = allContentData.find(({id}) => id === contentId);

  const content = getContent();

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>
            <h1>Reach Your Potential</h1>
            <p>
              GED® test preparation includes classroom instruction, textbook,
              calculator, test taking strategies, GED® Ready Practice Test, and
              participation in transition activities. City Temple is proud to be
              one of many locations throughout the city offering these free
              preparation courses.
            </p>
          </TopInfoBox>
          <ContentAndSubCompassWrapper>
            <AboveContentLinks
              pagePath={routePaths.MAIN_GED}
              pageTitle="Ged Program"
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={allContentData}
                  onClick={id => setContentId(id)}
                  title="Ged Program"
                />
              </ContentLeftSide>
              <ContentWrapper>{content}</ContentWrapper>
              <ContentRightSide />
            </ContentAndSides>
          </ContentAndSubCompassWrapper>
        </TopInfoBoxWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}
