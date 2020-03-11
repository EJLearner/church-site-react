import React, {useState} from 'react';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import MainMenubar from './MainMenubar';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import routePaths from '../routePaths';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import ContentRightSide from './commonComponents/ContentRightSide';
import SideMenu from './commonComponents/SideMenu';

const IDS = {
  INFO: 'info',
  IF_INFECTED: 'if-sick',
  PROCEDURE_CHANGES: 'church-procedure-changes'
};

const menuData = [
  {id: IDS.INFO, title: 'Preventing Sickness'},
  {id: IDS.IF_INFECTED, title: 'What to do if infected'},
  {
    id: IDS.PROCEDURE_CHANGES,
    title: 'What the church is doing differently'
  }
];

const infoContent = (
  <>
    <h2>Preventing Sickness</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolores
      corporis eligendi alias obcaecati excepturi asperiores iste pariatur
      sapiente repellendus, perspiciatis neque repudiandae numquam debitis ipsam
      amet! Animi, laboriosam beatae.
    </p>
  </>
);

const ifInfectedContent = (
  <>
    <h2>What if I’m Sick</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolores
      corporis eligendi alias obcaecati excepturi asperiores iste pariatur
      sapiente repellendus, perspiciatis neque repudiandae numquam debitis ipsam
      amet! Animi, laboriosam beatae.
    </p>
  </>
);

const procedureChangesContent = (
  <>
    <h2>Changed Procedures</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolores
      corporis eligendi alias obcaecati excepturi asperiores iste pariatur
      sapiente repellendus, perspiciatis neque repudiandae numquam debitis ipsam
      amet! Animi, laboriosam beatae.
    </p>
  </>
);

const contentMap = {
  [IDS.INFO]: infoContent,
  [IDS.IF_INFECTED]: ifInfectedContent,
  [IDS.PROCEDURE_CHANGES]: procedureChangesContent
};

export default function CoronaVirusPage() {
  const [contentId, setContentId] = useState(menuData[0].id);

  const content = contentMap[contentId];

  return (
    <StandardPageWrapper>
      <MainMenubar />
      <TopInfoBoxWrapper>
        <TopInfoBox>
          <h1>Header</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            autem quos? Esse nesciunt, quos repellendus, corrupti obcaecati
            sequi, cumque iusto modi cum dolor fugit dignissimos odit unde non
            odio ipsum!
          </p>
        </TopInfoBox>
        <ContentAndSubCompassWrapper>
          <AboveContentLinks
            pagePath={routePaths.MAIN_CORONAVIRUS}
            pageTitle="Coronavirus"
          />
          <ContentAndSides>
            <ContentLeftSide>
              <SideMenu
                currentId={contentId}
                menuData={menuData}
                onClick={id => setContentId(id)}
                title="Coronavirus"
              />
            </ContentLeftSide>
            <ContentWrapper>{content}</ContentWrapper>
            <ContentRightSide />
          </ContentAndSides>
        </ContentAndSubCompassWrapper>
      </TopInfoBoxWrapper>
    </StandardPageWrapper>
  );
}
