import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import routePaths from './routePaths';

import Admin from './ce/components/Admin/Admin';
import Calendar from './ce/components/Calendar/Calendar';
import CcCheckin from './ce/components/CcVbsCheckinOut/CcCheckin';
import CcCheckout from './ce/components/CcVbsCheckinOut/CcCheckout';
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
import ThankYouPage from './ce/components/Reusable/ThankYouPage/ThankYouPage';
import VbsCheckin from './ce/components/CcVbsCheckinOut/VbsCheckin';
import VbsCheckout from './ce/components/CcVbsCheckinOut/VbsCheckout';
import VbsRegistrationLanding from './ce/components/RegistrationPages/VbsRegistrationLanding';
import VbsRegistrationStudent, {
  STUDENT_TYPES as regStudentTypes
} from './ce/components/RegistrationPages/VbsRegistrationStudent';
import VbsRegistrationVolunteer from './ce/components/RegistrationPages/VbsRegistrationVolunteer';
import Vision from './ce/components/Vision/Vision';
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
        path: routePaths.CE_YOUTH,
        text: `Programs`
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
            path={routePaths.CE_CC_CHECKIN}
            render={() => (
              <BareCePage>
                <CcCheckin />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_CC_CHECKOUT}
            render={() => (
              <BareCePage>
                <CcCheckout />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_CHECKIN}
            render={() => (
              <BareCePage>
                <VbsCheckin />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_CHECKOUT}
            render={() => (
              <BareCePage>
                <VbsCheckout />
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
          {routePaths.OLD_PATHS_CE_IDEA_FORM.map(oldPath => {
            return (
              <Redirect
                from={oldPath}
                key={oldPath}
                to={routePaths.CE_IDEA_FORM}
              />
            );
          })}
          <Route
            path={routePaths.CE_IDEA_FORM}
            render={() => (
              <FullCePage>
                <IdeaForm />
              </FullCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_REG_ADULT}
            render={() => (
              <BareCePage>
                <VbsRegistrationStudent studentType={regStudentTypes.ADULT} />
              </BareCePage>
            )}
          />
          <Route
            path={routePaths.CE_VBS_REG_CHILD}
            render={() => (
              <BareCePage>
                <VbsRegistrationStudent studentType={regStudentTypes.CHILD} />
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
            path={routePaths.CE_THANK_YOU}
            render={() => (
              <FullCePage>
                <ThankYouPage />
              </FullCePage>
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
            path="/ce/where"
            render={() => (
              <FullCePage>
                <Youth />
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
