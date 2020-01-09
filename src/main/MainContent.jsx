import React from 'react';
import styled from 'styled-components';

import churchExterior from '../assets/main/images/church-exterior.png';

import MainMenubar from './MainMenubar';
import {LOGICAL_COLORS, FONT_FAMILIES} from '../utils/styleVariables';

const MenuBarAndPictureDiv = styled.div`
  background-image: url(${churchExterior});
  background-repeat: no-repeat;
  background-size: cover;
`;

const AnnouncementBox = styled.div`
  margin: 64px 0 0 64px;
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

const Numbers = styled.span`
  font-size: 160%;
`;

const SecondLine = styled.h2`
  font-style: italic;
  margin-top: 0;
  text-align: right;
`;

const ArrowAndLearnmore = styled.div`
  display: inline-block;
  height: 2em;
`;

const ArrowBox = styled.div`
  background-color: ${LOGICAL_COLORS.$CT_ACCENT};
  display: inline-block;
  height: 100%;
`;
const LearnMoreBox = styled.div`
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  display: inline-block;
  height: 100%;
`;

function MainContent() {
  return (
    <>
      <MenuBarAndPictureDiv className="menu-bar-and-picture">
        <MainMenubar />
        <AnnouncementBox>
          <TitleAndContent>
            <TitlesDiv>
              <FirstLine>
                <Numbers>
                  50<sup>th</sup>
                </Numbers>{' '}
                Anniversary Celebration
              </FirstLine>
              <SecondLine>Year of Jubilee!</SecondLine>
            </TitlesDiv>
            <p>
              2020 marks an important milestone in the life of our church. Join
              us each Sunday as we celebrate and thank God for 50 years of
              worship, outreach, and praise!
            </p>
          </TitleAndContent>
          <ArrowAndLearnmore>
            <ArrowBox>&gt;</ArrowBox>
            <LearnMoreBox>Learn More</LearnMoreBox>
          </ArrowAndLearnmore>
        </AnnouncementBox>
      </MenuBarAndPictureDiv>
    </>
  );
}

export default MainContent;
