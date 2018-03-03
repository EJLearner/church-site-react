import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Admin from './ce/components/Admin/Admin';
import Calendar from './ce/components/Calendar/Calendar';
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
        path: '/',
        text: 'Home'
      },
      {
        path: '/who',
        text: `Who We are`
      },
      {
        path: '/why',
        text: `Why We Are Here`
      },
      {
        path: '/where',
        text: `Where We Are Going`
      },
      {
        path: '/ideaform',
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
            path="/admin"
            render={() => (
              <BareCePage>
                <Admin />
              </BareCePage>
            )}
          />
          <Route component={Calendar} path="/calendar" />
          <Route
            path="/cc-registration-child"
            render={() => (
              <BareCePage>
                <CcRegistrationChild />
              </BareCePage>
            )}
          />
          <Route
            path="/cc-registration-landing"
            render={() => (
              <BareCePage>
                <CcRegistrationLanding />
              </BareCePage>
            )}
          />
          <Route
            path="/cc-registration-volunteer"
            render={() => (
              <BareCePage>
                <CcRegistrationVolunteer />
              </BareCePage>
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
            path="/ideaform"
            render={() => (
              <FullCePage>
                <IdeaForm />
              </FullCePage>
            )}
          />
          <Route
            path="/vbs-registration-child"
            render={() => (
              <BareCePage>
                <VbsRegistrationChild />
              </BareCePage>
            )}
          />
          <Route
            path="/vbs-registration-landing"
            render={() => (
              <BareCePage>
                <VbsRegistrationLanding />
              </BareCePage>
            )}
          />
          <Route
            path="/vbs-registration-volunteer"
            render={() => (
              <BareCePage>
                <VbsRegistrationVolunteer />
              </BareCePage>
            )}
          />
          <Route
            path="/vision"
            render={() => (
              <FullCePage>
                <Vision />
              </FullCePage>
            )}
          />
          <Route
            path="/who"
            render={() => (
              <FullCePage>
                <WhoWeAre />
              </FullCePage>
            )}
          />
          <Route
            path="/why"
            render={() => (
              <FullCePage>
                <Why />
              </FullCePage>
            )}
          />
          <Route
            path="/where"
            render={() => (
              <FullCePage>
                <Where />
              </FullCePage>
            )}
          />
          <Route
            path="/youth"
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
