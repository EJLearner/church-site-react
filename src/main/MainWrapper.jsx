import React from 'react';
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
import churchExterior from '../assets/main/images/church-exterior.png';
import CultureAndFineArtsPage from './CultureAndFineArtsPage';
import WorshipExperiencePage from './WorshipExperiencePage';

const WrapperDiv = styled.div`
  background-attachment: fixed;
  background-image: url(${churchExterior});
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 150px;
`;

function MainWrapper() {
  return (
    <WrapperDiv>
      <Switch>
        <Route component={AboutUsPage} path={routePaths.MAIN_ABOUT_US} />
        <Route component={Calendar} path={routePaths.MAIN_CALENDAR} />
        <Route component={ContactPage} path={routePaths.MAIN_CONTACT} />
        <Route component={GivingPage} path={routePaths.MAIN_GIVING} />
        <Route component={JubileePage} path={routePaths.MAIN_JUBILEE_PAGE} />
        <Route component={MainContent} exact path={routePaths.MAIN_HOME} />
        <Route component={MembersOnly} path={routePaths.MAIN_MEMBERS_ONLY} />
        <Route component={MinistriesPage} path={routePaths.MAIN_MINISTRIES} />
        <Route
          component={WorshipExperiencePage}
          path={routePaths.MAIN_WORSHIP_EXPERIENCE_PAGE}
        />
        <Route
          component={MusicMinistryPage}
          path={routePaths.MAIN_MUSIC_MINISTRY}
        />
        <Route
          component={CultureAndFineArtsPage}
          path={routePaths.MAIN_PERFORMING_ARTS_PAGE}
        />
        <Route component={ScholarshipPage} path={routePaths.MAIN_SCHOLARSHIP} />
        <Route
          component={ServiceInfoPage}
          path={routePaths.MAIN_SERVICE_INFO}
        />

        <Route component={NotFound} />
      </Switch>
      <MainFooter />
    </WrapperDiv>
  );
}

export default MainWrapper;
