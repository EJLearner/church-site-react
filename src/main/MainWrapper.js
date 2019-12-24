import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import MainContent from './MainContent';
import MainFooter from './MainFooter';
import MainMenubar from './MainMenubar';
import routePaths from '../routePaths';

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
        <Route component={MainContent} path={routePaths.MAIN_HOME} />
      </Switch>
      <MainFooter />
    </MainWrapper>
  );
}

export default MainHome;
