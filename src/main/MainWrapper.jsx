import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import MainContent from './MainPage';
import routePaths from '../routePaths';
import NotFound from '../ce/components/NotFound/NotFound';
import MainAboutUs from './AboutUs';
import Ministries from './Ministries';
import Giving from './Giving';
import Calendar from './Calendar';
import MembersOnly from './MembersOnly';
import Contact from './Contact';

const WrapperDiv = styled.div`
  max-width: 80%;
  margin: auto;
`;

function MainWrapper() {
  return (
    <WrapperDiv>
      <Switch>
        <Route component={MainContent} exact path={routePaths.MAIN_HOME} />
        <Route component={MainAboutUs} path={routePaths.MAIN_ABOUT_US} />
        <Route component={Ministries} path={routePaths.MAIN_MINISTRIES} />
        <Route component={Giving} path={routePaths.MAIN_GIVING} />
        <Route component={Calendar} path={routePaths.MAIN_CALENDAR} />
        <Route component={MembersOnly} path={routePaths.MAIN_MEMBERS_ONLY} />
        <Route component={Contact} path={routePaths.MAIN_CONTACT} />
        <Route component={NotFound} />
      </Switch>
    </WrapperDiv>
  );
}

export default MainWrapper;
