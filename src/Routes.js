import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Calendar from './Components/Calendar/Calendar';
import CcRegistrationVolunteer from './Components/RegistrationPages/CcRegistrationVolunteer';
import CcRegistrationChild from './Components/RegistrationPages/CcRegistrationChild';
import CcRegistrationLanding from './Components/RegistrationPages/CcRegistrationLanding';
import CeLogo from './Components/CeLogo/CeLogo';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import IdeaForm from './Components/IdeaForm/IdeaForm';
import MenuBar from './Components/MenuBar/MenuBar';
import NotFound from './Components/NotFound/NotFound';
import Quote from './Components/Quote/Quote';
import TitleBar from './Components/TitleBar/TitleBar';
import VbsRegistrationLanding from './Components/RegistrationPages/VbsRegistrationLanding';
import Vision from './Components/Vision/Vision';
import Where from './Components/Where/Where';
import WhoWeAre from './Components/WhoWeAre/WhoWeAre';
import Why from './Components/Why/Why';
import Youth from './Components/Youth/Youth';

import './App.css';

class Routes extends Component {
  _renderFullPage(props) {
    return (
      <div id="top-react-div">
        <TitleBar />
        <MenuBar />
        {props.children}
        <Quote />
        <Footer />
      </div>
    );
  }

  _renderBarePage(props) {
    return (
      <div id="top-react-div">
        <TitleBar />
        {props.children}
        <CeLogo />
      </div>
    );
  }

  render() {
    const FullPage = this._renderFullPage;
    const BarePage = this._renderBarePage;

    // prettier-ignore
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <FullPage><Home /></FullPage>} />
          <Route path="/calendar" render={() => <FullPage><Calendar /></FullPage>} />
          <Route path="/cc-registration-landing" render={() => <BarePage><CcRegistrationLanding /></BarePage>} />
          <Route path="/cc-registration-volunteer" render={() => <BarePage><CcRegistrationVolunteer /></BarePage>} />
          <Route path="/cc-registration-child" render={() => <BarePage><CcRegistrationChild /></BarePage>} />
          <Route path="/christianedu.html" render={() => <FullPage><Home /></FullPage>} />
          <Route path="/ideaform" render={() => <FullPage><IdeaForm /></FullPage>} />
          <Route path="/vbs-registration-landing" render={() => <BarePage><VbsRegistrationLanding /></BarePage>} />
          <Route path="/vision" render={() => <FullPage><Vision /></FullPage>} />
          <Route path="/who" render={() => <FullPage><WhoWeAre /></FullPage>} />
          <Route path="/why" render={() => <FullPage><Why /></FullPage>} />
          <Route path="/where" render={() => <FullPage><Where /></FullPage>} />
          <Route path="/youth" render={() => <FullPage><Youth /></FullPage>} />
          <Route render={() => <FullPage><NotFound /></FullPage>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
