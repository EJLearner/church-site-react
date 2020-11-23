import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import NotFound from '../ce/components/NotFound/NotFound';
import routePaths from '../routePaths';
import backgroundStore from '../stores/backgroundStore';
import {SIZES} from '../utils/styleVariables';

import AboutUsPage from './AboutUsPage';
import Calendar from './CalendarPage';
import ContactPage from './ContactPage';
import CoronavirusPage from './CoronavirusPage';
import CultureAndFineArtsPage from './CultureAndFineArtsPage';
import GedPage from './GedPage';
import GivingPage from './GivingPage';
import JubileePage from './JubileePage';
import MainPage from './MainPage';
import MeditationsPage from './MeditationsPage';
import MembersOnly from './MembersOnly';
import MinistriesPage from './MinistriesPage';
import NewsPage from './NewsPage';
import ScholarshipPage from './ScholarshipPage';
import VotingInformationPage from './VotingInformationPage';
import WatchPage from './WatchPage';
import MainFooter from './commonComponents/MainFooter';

const WrapperDiv = styled.div`
  background-attachment: fixed;
  background-image: url(${(props) => props.backgroundSource});
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: ${SIZES.FOOTER_HEIGHT};
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

  return (
    <WrapperDiv backgroundSource={backgroundSource}>
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
          <CoronavirusPage />
        </Route>
        <Route path={routePaths.MAIN_CULTURE_AND_ARTS}>
          <CultureAndFineArtsPage />
        </Route>
        <Route path={routePaths.MAIN_GED}>
          <GedPage />
        </Route>
        <Route path={routePaths.MAIN_GIVING}>
          <GivingPage />
        </Route>
        <Route path={routePaths.MAIN_JUBILEE}>
          <JubileePage />
        </Route>
        <Route exact path={routePaths.MAIN_HOME}>
          <MainPage />
        </Route>
        <Route path={routePaths.MAIN_MEDITATIONS}>
          <MeditationsPage />
        </Route>
        <Route path={routePaths.MAIN_MEMBERS_ONLY}>
          <MembersOnly />
        </Route>
        <Route path={routePaths.MAIN_MINISTRIES}>
          <MinistriesPage />
        </Route>
        <Route path={routePaths.MAIN_NEWS}>
          <NewsPage />
        </Route>
        <Route path={routePaths.MAIN_SCHOLARSHIP}>
          <ScholarshipPage />
        </Route>
        <Route path={routePaths.MAIN_VOTING_INFORMATION}>
          <VotingInformationPage />
        </Route>
        <Route path={routePaths.MAIN_WATCH}>
          <WatchPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <MainFooter />
    </WrapperDiv>
  );
}

export default MainWrapper;
