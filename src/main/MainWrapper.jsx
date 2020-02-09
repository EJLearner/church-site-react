import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import MainContent from './MainPage';
import routePaths from '../routePaths';
import NotFound from '../ce/components/NotFound/NotFound';
import AboutUsPage from './AboutUsPage';
import MinistriesPage from './MinistriesPage';
import GivingPage from './GivingPage';
import Calendar from './Calendar';
import MembersOnly from './MembersOnly';
import ContactPage from './ContactPage';
import ScholarshipPage from './ScholarshipPage';
import ServiceInfoPage from './ServiceInfoPage';
import JubileePage from './JubileePage';
import MainFooter from './commonComponents/MainFooter';
import MusicMinistryPage from './MusicMinistryPage';
import CultureAndFineArtsPage from './CultureAndFineArtsPage';
import WorshipExperiencePage from './WorshipExperiencePage';
import backgroundStore from '../stores/backgroundStore';

const WrapperDiv = styled.div`
  background-attachment: fixed;
  background-image: url(${props => props.backgroundSource});
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 150px;
`;

const PAGE_ID = 'main-wrapper';

function MainWrapper() {
  const [backgroundSource, setBackgroundSource] = useState(
    backgroundStore.getBackgroundSource()
  );

  useEffect(() => {
    backgroundStore.subscribe(PAGE_ID, newBackgroundSource => {
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
        <Route path={routePaths.MAIN_GIVING}>
          <GivingPage />
        </Route>
        <Route path={routePaths.MAIN_JUBILEE}>
          <JubileePage />
        </Route>
        <Route exact path={routePaths.MAIN_HOME}>
          <MainContent />
        </Route>
        <Route path={routePaths.MAIN_MEMBERS_ONLY}>
          <MembersOnly />
        </Route>
        <Route path={routePaths.MAIN_MINISTRIES}>
          <MinistriesPage />
        </Route>
        <Route path={routePaths.MAIN_WORSHIP_EXPERIENCE}>
          <WorshipExperiencePage />
        </Route>
        <Route path={routePaths.MAIN_MUSIC_MINISTRY}>
          <MusicMinistryPage />
        </Route>
        <Route path={routePaths.MAIN_CULTURE_AND_ARTS}>
          <CultureAndFineArtsPage />
        </Route>
        <Route path={routePaths.MAIN_SCHOLARSHIP}>
          <ScholarshipPage />
        </Route>
        <Route path={routePaths.MAIN_SERVICE_INFO}>
          <ServiceInfoPage />
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
