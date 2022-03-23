import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Admin from './ce/components/Admin/Admin';
import Calendar from './ce/components/Calendar/Calendar';
import CcCheckin from './ce/components/CcVbsCheckinOut/CcCheckin';
import CcCheckout from './ce/components/CcVbsCheckinOut/CcCheckout';
import VbsCheckin from './ce/components/CcVbsCheckinOut/VbsCheckin';
import VbsCheckout from './ce/components/CcVbsCheckinOut/VbsCheckout';
import CeLogo from './ce/components/CeLogo/CeLogo';
import Footer from './ce/components/Footer/Footer';
import CeHome from './ce/components/Home/CeHome';
import IdeaForm from './ce/components/IdeaForm/IdeaForm';
import MenuBar from './ce/components/MenuBar/MenuBar';
import Quote from './ce/components/Quote/Quote';
import CcRegistrationChild from './ce/components/RegistrationPages/CcRegistrationChild';
import CcRegistrationLanding from './ce/components/RegistrationPages/CcRegistrationLanding';
import CcRegistrationVolunteer from './ce/components/RegistrationPages/CcRegistrationVolunteer';
import VbsRegistrationLanding from './ce/components/RegistrationPages/VbsRegistrationLanding';
import VbsRegistrationStudent, {
  STUDENT_TYPES as regStudentTypes
} from './ce/components/RegistrationPages/VbsRegistrationStudent';
import VbsRegistrationVolunteer from './ce/components/RegistrationPages/VbsRegistrationVolunteer';
import ThankYouPage from './ce/components/Reusable/ThankYouPage/ThankYouPage';
import TitleBar from './ce/components/TitleBar/TitleBar';
import Vision from './ce/components/Vision/Vision';
import WhoWeAre from './ce/components/WhoWeAre/WhoWeAre';
import Why from './ce/components/Why/Why';
import Youth from './ce/components/Youth/Youth';
import MainWrapper from './main/MainWrapper';
import ScrollToTop from './main/commonComponents/ScrollToTop';
import routePaths from './routePaths';

function newRenderFullCePage(content) {
  const mainTopLinks = [
    {
      path: routePaths.CE_HOME,
      text: 'Home'
    },
    {
      path: routePaths.CE_WHO,
      text: 'Who We are'
    },
    {
      path: routePaths.CE_WHY,
      text: 'Why We Are Here'
    },
    {
      path: routePaths.CE_YOUTH,
      text: 'Programs'
    },
    {
      path: routePaths.CE_IDEA_FORM,
      text: 'Tell Us What You Think'
    }
  ];

  return (
    <div id="top-react-div">
      <TitleBar />
      <MenuBar id="main-menu-bar" links={mainTopLinks} />
      {content}
      <Quote />
      <Footer />
    </div>
  );
}

function newRenderBareCePage(content) {
  return (
    <div id="top-react-div">
      <TitleBar />
      {content}
      <CeLogo />
    </div>
  );
}

const TopRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route component={MainWrapper} exact path={routePaths.MAIN_HOME} />
        <Route exact path={routePaths.CE_HOME}>
          {newRenderFullCePage(<CeHome />)}
        </Route>
        <Route path={routePaths.ADMIN}>{newRenderBareCePage(<Admin />)}</Route>
        <Route path={routePaths.CE_CC_CHECKIN}>
          {newRenderBareCePage(<CcCheckin />)}
        </Route>
        <Route path={routePaths.CE_CC_CHECKOUT}>
          {newRenderBareCePage(<CcCheckout />)}
        </Route>
        <Route path={routePaths.CE_VBS_CHECKIN}>
          {newRenderBareCePage(<VbsCheckin />)}
        </Route>
        <Route path={routePaths.CE_VBS_CHECKOUT}>
          {newRenderBareCePage(<VbsCheckout />)}
        </Route>
        <Route component={Calendar} path={routePaths.CE_CALENDAR} />
        <Route path={routePaths.CE_CC_REG_CHILD}>
          {newRenderBareCePage(<CcRegistrationChild />)}
        </Route>
        <Route path={routePaths.CE_CC_REG_LANDING}>
          {newRenderBareCePage(<CcRegistrationLanding />)}
        </Route>
        <Route path={routePaths.CE_CC_REG_VOLUNTEER}>
          {newRenderBareCePage(<CcRegistrationVolunteer />)}
        </Route>
        {routePaths.OLD_PATHS_CE_IDEA_FORM.map((oldPath) => {
          return (
            <Route
              key={oldPath}
              path={oldPath}
              render={() => <Redirect to={routePaths.CE_IDEA_FORM} />}
            />
          );
        })}
        <Route path={routePaths.CE_IDEA_FORM}>
          {newRenderFullCePage(<IdeaForm />)}
        </Route>
        <Route path={routePaths.CE_VBS_REG_ADULT}>
          {newRenderBareCePage(
            <VbsRegistrationStudent studentType={regStudentTypes.ADULT} />
          )}
        </Route>
        <Route path={routePaths.CE_VBS_REG_CHILD}>
          {newRenderBareCePage(
            <VbsRegistrationStudent studentType={regStudentTypes.CHILD} />
          )}
        </Route>
        <Route path={routePaths.CE_VBS_REG_LANDING}>
          {newRenderBareCePage(<VbsRegistrationLanding />)}
        </Route>
        <Route path={routePaths.CE_VBS_REG_VOLUNTEER}>
          {newRenderBareCePage(<VbsRegistrationVolunteer />)}
        </Route>
        <Route path={routePaths.CE_THANK_YOU}>
          {newRenderFullCePage(<ThankYouPage />)}
        </Route>
        <Route path={routePaths.CE_VISION}>
          {newRenderFullCePage(<Vision />)}
        </Route>
        <Route path={routePaths.CE_WHO}>
          {newRenderFullCePage(<WhoWeAre />)}
        </Route>
        <Route path={routePaths.CE_WHY}>{newRenderFullCePage(<Why />)}</Route>
        <Route path={routePaths.CE_YOUTH}>
          {newRenderFullCePage(<Youth />)}
        </Route>

        <Route component={MainWrapper} path={routePaths.MAIN_HOME} />
      </Switch>
    </BrowserRouter>
  );
};

export default TopRoutes;
