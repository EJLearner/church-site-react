import React from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS, FONT_FAMILIES} from '../../utils/styleVariables';

const sidePadding = '64px';

const AnnouncementBox = styled.div`
  margin: ${sidePadding} 0 ${sidePadding} ${sidePadding};
  width: 50%;
`;

const TitleAndContent = styled.div`
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  padding: 1em;
  max-width: 500px;
`;

const TitlesDiv = styled.div`
  display: inline-block;
`;

const FirstLine = styled.h1`
  font-family: ${FONT_FAMILIES.BRUSH_SCRIPT};
  margin-bottom: 0;
  line-height: 0.7;
  text-align: right;
`;

const SecondLine = styled.h2`
  font-style: italic;
  margin-top: 0;
  text-align: right;
`;

const MenuAndContent = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;
const LeftSide = styled.div`
  border: 1px solid black;
  padding: 1em;
  width: 30%;

  h2 {
    margin-top: 0;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
  }
`;

const Content = styled.div`
  border: 1px solid black;
  padding: 1em;
  width: 70%;
`;

const ContentButton = styled.button`
  background-color: ${LOGICAL_COLORS.STANDARD_BACKGROUND};
  border: none;
  cursor: pointer;
  display: block;
  line-height: 150%;
  margin: 0;
  padding: 0;
  text-align: left;
`;

function JubileePage() {
  return (
    <div className="menu-bar-and-picture">
      <MainMenubar />
      <AnnouncementBox>
        <TitleAndContent>
          <TitlesDiv>
            <FirstLine>Performing Arts</FirstLine>
            <SecondLine>Year of Jubilee!</SecondLine>
          </TitlesDiv>
          <p>
            2020 marks an important milestone in the life of our church. Join us
            each Sunday as we celebrate and thank God for 50 years of worship,
            outreach, and praise!
          </p>
        </TitleAndContent>
      </AnnouncementBox>
      <MenuAndContent>
        <LeftSide>
          <h2>Anniversary</h2>
          <ul>
            <li>
              <ContentButton>50th Anniversary Celebration</ContentButton>
            </li>
            <li>
              <ContentButton>Event Calendar</ContentButton>
            </li>
            <li>
              <ContentButton>Store</ContentButton>
            </li>
          </ul>
        </LeftSide>
        <Content>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          officia necessitatibus atque molestiae? Eveniet debitis itaque ad
          iure. Cumque reiciendis eveniet quia fugiat eius nostrum vel
          doloremque dignissimos, quisquam atque.
        </Content>
      </MenuAndContent>
    </div>
  );
}

export default JubileePage;
