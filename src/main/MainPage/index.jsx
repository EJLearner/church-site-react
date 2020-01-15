import React from 'react';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import churchExterior from '../../assets/main/images/church-exterior.png';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import ScrollingEventsText from './ScrollingEventsText';
import ContentSelectBoxes from './ContentSelectBoxes';
import JubileeContent from './JubileeContent';

const MenuBarAndPictureDiv = styled.div`
  background-image: url(${churchExterior});
  background-repeat: no-repeat;
  background-size: cover;
`;

const AnnouncementBox = styled.div`
  margin: 64px 0 0 64px;
  width: 50%;
`;

const ArrowAndLearnmore = styled.div`
  display: inline-flex;
  align-items: stretch;
`;

const ArrowBox = styled.div`
  background-color: ${LOGICAL_COLORS.$CT_ACCENT};
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
  font-size: 120%;
  font-weight: bold;
  justify-content: center;
  padding: 0 0.5em;
  text-transform: uppercase;
`;

const UpcomingEvents = styled.div`
  align-items: center;
  background-color: ${LOGICAL_COLORS.$CT_SECOND};
  display: flex;
  padding: 48px 64px;
`;

const SaveTheDate = styled.div`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  font-size: 300%;
  font-weight: bold;
  text-transform: uppercase;
`;

function MainContent() {
  return (
    <>
      <MenuBarAndPictureDiv className="menu-bar-and-picture">
        <MainMenubar />
        <AnnouncementBox>
          <JubileeContent />
          <ArrowAndLearnmore>
            <ArrowBox>
              <div>
                <FontAwesomeIcon icon={faAngleRight} size="4x" />
              </div>
            </ArrowBox>
            <LearnMoreBox>
              <div>Learn More</div>
            </LearnMoreBox>
          </ArrowAndLearnmore>
        </AnnouncementBox>
      </MenuBarAndPictureDiv>
      <UpcomingEvents>
        <SaveTheDate>Save The Date</SaveTheDate>
        <ScrollingEventsText />
        <ContentSelectBoxes />
      </UpcomingEvents>
    </>
  );
}

export default MainContent;
