import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import Home from '../Home/Home'
import IdeaForm from '../IdeaForm/IdeaForm'
import NotFound from '../NotFound/NotFound'
import What from '../What/What'
import Where from '../Where/Where'
import WhoWeAre from '../WhoWeAre/WhoWeAre'
import Why from '../Why/Why'


class PageContent extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/christianedu.html" component={Home}/>
          <Route path="/calendar" component={Calendar}/>
          <Route path="/ideaform" component={IdeaForm}/>
          {/* <Route path="/cc-registration" component={RegistrationLanding}/> */}
          <Route path="/who" component={WhoWeAre}/>
          <Route path="/why" component={Why}/>
          <Route path="/what" component={What}/>
          <Route path="/where" component={Where}/>
          <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default PageContent;
