import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainContent from './MainContent';
import MainFooter from './MainFooter';
import MainMenubar from './MainMenubar';
import routePaths from '../routePaths';

class MainHome extends React.Component {
  render() {
    return (
      <>
        <p>Forms/MemberLogin links</p>
        <MainMenubar />
        <Switch>
          <Route component={MainContent} path={routePaths.MAIN_HOME} />
        </Switch>
        <MainFooter />
      </>
    );
  }
}

export default MainHome;
