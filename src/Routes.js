import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import routePaths from './routePaths';

import Admin from './ce/components/Admin/Admin';
import Calendar from './ce/components/Calendar/Calendar';
import CcLogin from './ce/components/CcVbsLogin/CcLogin';
import CcRegistrationChild from './ce/components/RegistrationPages/CcRegistrationChild';
import CcRegistrationLanding from './ce/components/RegistrationPages/CcRegistrationLanding';
import CcRegistrationVolunteer from './ce/components/RegistrationPages/CcRegistrationVolunteer';
import CeLogo from './ce/components/CeLogo/CeLogo';
import Footer from './ce/components/Footer/Footer';
import Home from './ce/components/Home/Home';
import IdeaForm from './ce/components/IdeaForm/IdeaForm';
import MenuBar from './ce/components/MenuBar/MenuBar';
import NotFound from './ce/components/NotFound/NotFound';
import Quote from './ce/components/Quote/Quote';
import TitleBar from './ce/components/TitleBar/TitleBar';
import VbsRegistrationChild from './ce/components/RegistrationPages/VbsRegistrationChild';
import VbsRegistrationLanding from './ce/components/RegistrationPages/VbsRegistrationLanding';
import VbsRegistrationVolunteer from './ce/components/RegistrationPages/VbsRegistrationVolunteer';
import Vision from './ce/components/Vision/Vision';
import Where from './ce/components/Where/Where';
import WhoWeAre from './ce/components/WhoWeAre/WhoWeAre';
import Why from './ce/components/Why/Why';
import Youth from './ce/components/Youth/Youth';

import './App.css';

class Routes extends Component {
  _renderFullCePage({children}) {
    const mainTopLinks = [
      {
        path: routePaths.CE_HOME,
        text: 'Home'
      },
      {
        path: routePaths.CE_WHO,
        text: `Who We are`
      },
      {
        path: routePaths.CE_WHY,
        text: `Why We Are Here`
      },
      {
        path: routePaths.CE_WHERE,
        text: `Where We Are Going`
      },
      {
        path: routePaths.CE_IDEA_FORM,
        text: `Tell Us What You Think`
      }
    ];

    return (
      <div id="top-react-div">
        <TitleBar />
        <MenuBar id="main-menu-bar" links={mainTopLinks} />
        {children}
        <Quote />
        <Footer />
      </div>
    );
  }

  _renderBareCePage({children}) {
    return (
      <div id="top-react-div">
        <TitleBar />
        {children}
        <CeLogo />
      </div>
    );
  }

  render() {
    const FullCePage = this._renderFullCePage;
    const BareCePage = this._renderBareCePage;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <FullCePage>
                <Home />
              </FullCePage>
            )}
          />
          <Route
            path="/christianedu.html"
            render={() => (
              <FullCePage>
                <Home />
              </FullCePage>
            )}
          />
          <Route
            exact
            path={routePaths.CE_HOME}
            render={() => (
              <FullCePage>
                <Home />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.ADMIN}
            render={() => (
              <BareCePage>
                <Admin />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_CC_SIGN_IN}
            render={() => (
              <BareCePage>
                <CcLogin />
              </BareCePage>
            )}
          />
          <Route component={Calendar} path={routePaths.CE_CALENDAR} />
          <Route
            path={routePaths.CE_CC_REG_CHILD}
            render={() => (
              <BareCePage>
                <CcRegistrationChild />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_CC_REG_LANDING}
            render={() => (
              <BareCePage>
                <CcRegistrationLanding />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_CC_REG_VOLUNTEER}
            render={() => (
              <BareCePage>
                <CcRegistrationVolunteer />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_IDEA_FORM}
            render={() => (
              <FullCePage>
                <IdeaForm />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_REG_CHILD}
            render={() => (
              <BareCePage>
                <VbsRegistrationChild />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_REG_LANDING}
            render={() => (
              <BareCePage>
                <VbsRegistrationLanding />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_REG_VOLUNTEER}
            render={() => (
              <BareCePage>
                <VbsRegistrationVolunteer />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VISION}
            render={() => (
              <FullCePage>
                <Vision />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_WHO}
            render={() => (
              <FullCePage>
                <WhoWeAre />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_WHY}
            render={() => (
              <FullCePage>
                <Why />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_WHERE}
            render={() => (
              <FullCePage>
                <Where />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_YOUTH}
            render={() => (
              <FullCePage>
                <Youth />
              </FullCePage>
            )}
          />
          <Route
            render={() => (
              <FullCePage>
                <NotFound />
              </FullCePage>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
