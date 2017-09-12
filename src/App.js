import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Calendar from './Components/Calendar/Calendar'
import CeLogo from './Components/CeLogo/CeLogo';
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import IdeaForm from './Components/IdeaForm/IdeaForm'
import MenuBar from './Components/MenuBar/MenuBar'
import NotFound from './Components/NotFound/NotFound'
import Quote from './Components/Quote/Quote'
import CcRegistrationLanding from './Components/RegistrationPages/CcRegistrationLanding'
import VbsRegistrationLanding from './Components/RegistrationPages/VbsRegistrationLanding'
import TitleBar from './Components/TitleBar/TitleBar'
import What from './Components/What/What'
import Where from './Components/Where/Where'
import WhoWeAre from './Components/WhoWeAre/WhoWeAre'
import Why from './Components/Why/Why'

import './App.css';

const FullPage = (props) => {
  return (
    <div id='top-react-div'>
      <TitleBar />
      <MenuBar />
      {props.children}
      <Quote />
      <Footer />
    </div>
  );
};

const BarePage = (props) => {
  return (
    <div id='top-react-div'>
      <TitleBar />
      {props.children}
      <CeLogo />
    </div>
  );
};


class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" render={() => <FullPage><Home /></FullPage>} />
          <Route path="/christianedu.html" render={() => <FullPage><Home /></FullPage>} />
          <Route path="/calendar" render={() => <FullPage><Calendar /></FullPage>} />
          <Route path="/ideaform" render={() => <FullPage><IdeaForm /></FullPage>} />
          <Route path="/cc-registration-landing" render={() => <BarePage><CcRegistrationLanding /></BarePage>} />
          <Route path="/vbs-registration-landing" render={() => <BarePage><VbsRegistrationLanding /></BarePage>} />
          <Route path="/who" render={() => <FullPage><WhoWeAre /></FullPage>} />
          <Route path="/why" render={() => <FullPage><Why /></FullPage>} />
          <Route path="/what" render={() => <FullPage><What /></FullPage>} />
          <Route path="/where" render={() => <FullPage><Where /></FullPage>} />
          <Route render={() => <FullPage><NotFound /></FullPage>} />
      </Switch>
    )
  }
}

export default App;
