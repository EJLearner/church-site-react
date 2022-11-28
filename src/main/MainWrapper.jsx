import React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import choir from '../assets/main/images/choir.jpg';
import routePaths from '../routePaths';
import GlobalStoreWrapper from '../stores/GlobalStoreWrapper';

import AboutUsPage from './AboutUsPage';
import BibleStudyPage from './BibleStudyPage';
import Calendar from './CalendarPage';
import ContactPage from './ContactPage';
import GivingPage from './GivingPage';
import HomePage from './HomePage';
import MainMenubar from './MainMenubar';
import MeditationsPage from './MeditationsPage';
import RemovedPage from './RemovedPage';
import WatchPage from './WatchPage';
import NotFound from './commonComponents/NotFound';

// TODO: probably need a photoshopped picture for this instead of this mask
const StyledMainWrapperDiv = styled.div`
  background: black;
  ${(props) =>
    props.isHome &&
    `
    background-attachment: fixed;
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${choir});
    background-size: cover;
    background-repeat: no-repeat;
  `}

  min-height: 100%;
`;

function MainWrapper() {
  const isHome = useLocation()?.pathname === '/';

  const mainMenuItems = [
    {text: 'Home', path: routePaths.MAIN_HOME},
    {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
    {text: 'Meditations', path: routePaths.MAIN_MEDITATIONS},
    {text: 'Giving', path: routePaths.MAIN_GIVING},
    {text: 'Bible Study', path: routePaths.BIBLE_STUDY},
    {text: 'Calendar', path: routePaths.MAIN_CALENDAR},
    {text: 'Contact', path: routePaths.MAIN_CONTACT}
  ].filter(Boolean);

  return (
    <GlobalStoreWrapper>
      <StyledMainWrapperDiv isHome={isHome}>
        <MainMenubar menuItems={mainMenuItems} />
        <Switch>
          <Route path={routePaths.MAIN_ABOUT_US}>
            <AboutUsPage />
          </Route>
          <Route path={routePaths.MAIN_CALENDAR}>
            <Calendar />
          </Route>
          <Route path={routePaths.MAIN_CONTACT}>
            <ContactPage />
          </Route>
          <Route path={routePaths.MAIN_CORONAVIRUS}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_ANNOUNCEMENTS}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.BIBLE_STUDY}>
            <BibleStudyPage />
          </Route>
          <Route path={routePaths.MAIN_CULTURE_AND_ARTS}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_GED}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_GIVING}>
            <GivingPage />
          </Route>
          <Route path={routePaths.MAIN_JUBILEE}>
            <RemovedPage />
          </Route>
          <Route exact path={routePaths.MAIN_HOME}>
            <HomePage />
          </Route>
          <Route path={routePaths.MAIN_MEDITATIONS}>
            <MeditationsPage />
          </Route>
          <Route path={routePaths.MAIN_MINISTRIES}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_NEWS}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_SCHOLARSHIP}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_VOTING_INFORMATION}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_WATCH}>
            <WatchPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </StyledMainWrapperDiv>
    </GlobalStoreWrapper>
  );
}

export default MainWrapper;
