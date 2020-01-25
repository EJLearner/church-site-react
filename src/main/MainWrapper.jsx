import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import MainContent from './MainPage';
import routePaths from '../routePaths';
import NotFound from '../ce/components/NotFound/NotFound';
import AboutUs from './AboutUs';
import Ministries from './Ministries';
import Giving from './Giving';
import Calendar from './Calendar';
import MembersOnly from './MembersOnly';
import Contact from './Contact';
import ScholarshipPage from './ScholarshipPage';
import ServiceInfoPage from './ServiceInfoPage';
import JubileePage from './JubileePage';
import MainFooter from './commonComponents/MainFooter';
import MusicMinistryPage from './MusicMinistryPage';

const WrapperDiv = styled.div`
  max-width: 80%;
  margin: auto;
`;

function MainWrapper() {
  return (
    <WrapperDiv>
      <Switch>
        <Route component={AboutUs} path={routePaths.MAIN_ABOUT_US} />
        <Route component={Calendar} path={routePaths.MAIN_CALENDAR} />
        <Route component={Contact} path={routePaths.MAIN_CONTACT} />
        <Route component={Contact} path={routePaths.MAIN_CONTACT} />
        <Route component={Giving} path={routePaths.MAIN_GIVING} />
        <Route component={JubileePage} path={routePaths.MAIN_JUBILEE_PAGE} />
        <Route component={MainContent} exact path={routePaths.MAIN_HOME} />
        <Route component={MembersOnly} path={routePaths.MAIN_MEMBERS_ONLY} />
        <Route component={Ministries} path={routePaths.MAIN_MINISTRIES} />
        <Route
          component={MusicMinistryPage}
          path={routePaths.MAIN_MUSIC_MINISTRY}
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
