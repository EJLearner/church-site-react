import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import MainContent from './MainContent';
import MainWelcome from './MainWelcome';
import MainFooter from './MainFooter';
import MainMenubar from './MainMenubar';
import routePaths from '../routePaths';
import NotFound from '../ce/components/NotFound/NotFound';

const MainWrapper = styled.div`
  max-width: 80%;
  margin: auto;
`;

function MainHome() {
  return (
    <MainWrapper>
      <p>Forms/MemberLogin links</p>
      <MainMenubar />
      <Switch>
        <Route component={MainContent} exact path={routePaths.MAIN_HOME} />
        <Route component={MainWelcome} path={routePaths.MAIN_WELCOME} />
        <Route component={NotFound} />
      </Switch>
      <MainFooter />
    </MainWrapper>
  );
}

export default MainHome;
