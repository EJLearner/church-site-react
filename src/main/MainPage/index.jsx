import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import churchExterior from '../../assets/main/images/church-exterior.png';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import routePaths from '../../routePaths';
import ScrollingEventsText from './ScrollingEventsText';
import ContentSelectBoxes from './ContentSelectBoxes';
import {contentSelectInfo} from './mainPageData';

const sidePadding = '64px';

const MenuBarAndPictureDiv = styled.div`
  background-image: url(${churchExterior});
  background-repeat: no-repeat;
  background-size: cover;
`;

const AnnouncementBox = styled.div`
  margin: ${sidePadding} 0 0 ${sidePadding};
  width: 50%;
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
  font-size: 120%;
  font-weight: bold;
  justify-content: center;
  padding: 0 0.5em;
  text-transform: uppercase;
`;

const UpcomingEvents = styled.div`
  align-items: center;
  background-color: ${LOGICAL_COLORS.CT_SECOND};
  display: flex;
  padding: 48px ${sidePadding};
`;

const SaveTheDate = styled.div`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  font-size: 300%;
  font-weight: bold;
  text-transform: uppercase;
`;

const footerData = [
  {
    actionWord: 'Apply',
    path: routePaths.MAIN_SCHOLARSHIP,
    subject: 'Dr. William Bryant Scholarship'
  },
  {
    actionWord: 'Visit',
    path: routePaths.MAIN_SERVICE_INFO,
    subject: 'Service Info'
  },
  {
    actionWord: 'Connect',
    path: routePaths.MAIN_MINISTRIES,
    subject: 'Ministries'
  },
  {
    actionWord: 'Giving',
    path: routePaths.MAIN_GIVING,
    subject: 'Make A Gift'
  },
  {
    actionWord: 'Follow Us',
    path: routePaths.MAIN_CONTACT,
    subject: 'Social Media'
  }
];

const Footer = styled.div`
  display: flex;
  padding: 24px ${sidePadding};
`;

const FooterItem = styled.div`
  color: ${LOGICAL_COLORS.CT_PRIMARY};
  font-size: 80%;
  margin-right: 48px;

  & div:first-child {
    font-weight: bold;
  }

  & a {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

function MainContent() {
  const [contentIndex, setContentIndex] = useState(0);

  const ContentComponent = contentSelectInfo[contentIndex].render;

  return (
    <>
      <MenuBarAndPictureDiv className="menu-bar-and-picture">
        <MainMenubar />
        <AnnouncementBox>
          <ContentComponent />
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
        <ContentSelectBoxes
          contentIndex={contentIndex}
          onContentSelect={index => setContentIndex(index)}
        />
      </UpcomingEvents>
      <Footer>
        {footerData.map(({path, actionWord, subject}) => (
          <FooterItem key={actionWord}>
            <Link to={path}>
              <div>{actionWord}</div>
              <div>{subject}</div>
            </Link>
          </FooterItem>
        ))}
      </Footer>
    </>
  );
}

export default MainContent;
