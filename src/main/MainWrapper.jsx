import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../routePaths';
import GlobalStoreWrapper from '../stores/GlobalStoreWrapper';
import backgroundStore from '../stores/backgroundStore';

import AboutUsPage from './AboutUsPage';
import Calendar from './CalendarPage';
import ComingSoonPage from './ComingSoonPage';
import ContactPage from './ContactPage';
import GivingPage from './GivingPage';
import MainMenubar from './MainMenubar';
import MainPage from './MainPage';
import getAnnouncementsContentArray from './MainPage/AnnouncementsContent/getAnnouncementsContentArray';
import AnnouncementsPage from './MainPage/AnnouncementsPage';
import MeditationsPage from './MeditationsPage';
import NewsPage from './NewsPage';
import RemovedPage from './RemovedPage';
import WatchPage from './WatchPage';
import NotFound from './commonComponents/NotFound';

// TODO: probably need a photoshopped picture for this instead of this mask
const StyledMainWrapperDiv = styled.div`
  background-attachment: fixed;
  background: black;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.backgroundSource});

  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
`;

const PAGE_ID = 'main-wrapper';

function MainWrapper() {
  const [backgroundSource, setBackgroundSource] = useState(
    backgroundStore.getBackgroundSource()
  );

  useEffect(() => {
    backgroundStore.subscribe(PAGE_ID, (newBackgroundSource) => {
      setBackgroundSource(newBackgroundSource);
    });

    return () => backgroundStore.unsubscribe(PAGE_ID);
  });

  const mainMenuItems = [
    {text: 'Home', path: routePaths.MAIN_HOME},
    {text: 'About Us', path: routePaths.MAIN_ABOUT_US},
    {text: 'Meditations', path: routePaths.MAIN_MEDITATIONS},
    {text: 'Giving', path: routePaths.MAIN_GIVING},
    {text: 'Bible Study', path: routePaths.BIBLE_STUDY},
    {text: 'Calendar', path: routePaths.MAIN_CALENDAR},
    {text: 'Contact', path: routePaths.MAIN_CONTACT},
    getAnnouncementsContentArray().length && {
      text: 'Announcements',
      path: routePaths.MAIN_ANNOUNCEMENTS
    }
  ].filter(Boolean);

  return (
    <GlobalStoreWrapper>
      <StyledMainWrapperDiv backgroundSource={backgroundSource}>
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
            <AnnouncementsPage />
          </Route>
          <Route path={routePaths.BIBLE_STUDY}>
            {/* TODO: replace with real page */}
            <ComingSoonPage />
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
            <MainPage />
          </Route>
          <Route path={routePaths.MAIN_MEDITATIONS}>
            <MeditationsPage />
          </Route>
          <Route path={routePaths.MAIN_MINISTRIES}>
            <RemovedPage />
          </Route>
          <Route path={routePaths.MAIN_NEWS}>
            <NewsPage />
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
