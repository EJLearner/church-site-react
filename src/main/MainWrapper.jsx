import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../routePaths';
import GlobalStoreWrapper from '../stores/GlobalStoreWrapper';
import backgroundStore from '../stores/backgroundStore';
import {SIZES} from '../utils/styleVariables';

import AboutUsPage from './AboutUsPage';
import Calendar from './CalendarPage';
import ContactPage from './ContactPage';
import GivingPage from './GivingPage';
import MainMenubar from './MainMenubar';
import MainContent from './MainPage';
import AnnouncementsPage from './MainPage/AnnouncementsPage';
import MeditationsPage from './MeditationsPage';
import NewsPage from './NewsPage';
import RemovedPage from './RemovedPage';
import WatchPage from './WatchPage';
import MainFooter from './commonComponents/MainFooter';
import NotFound from './commonComponents/NotFound';

const StyledMainWrapperDiv = styled.div`
  background-attachment: fixed;
  background-image: url(${(props) => props.backgroundSource});
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: ${SIZES.FOOTER_HEIGHT};
  min-height: 100%;

  .shopping-cart-link {
    position: fixed;

    bottom: 100px;
    right: 80px;
  }
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

  return (
    <GlobalStoreWrapper>
      <StyledMainWrapperDiv backgroundSource={backgroundSource}>
        <MainMenubar />
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
            <MainContent />
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
        <MainFooter />
      </StyledMainWrapperDiv>
    </GlobalStoreWrapper>
  );
}

export default MainWrapper;
