// import Slider from './Slider/Slider'
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import Home from '../Home/Home'
import IdeaForm from '../IdeaForm/IdeaForm'
import What from '../What/What'
import Where from '../Where/Where'
import WhoWeAre from '../WhoWeAre/WhoWeAre'
import Why from '../Why/Why'


class PageContent extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/calendar" component={Calendar}/>
          <Route path="/who" component={WhoWeAre}/>
          <Route path="/why" component={Why}/>
          <Route path="/where" component={Where}/>
          <Route path="/what" component={What}/>
          <Route path="/ideaform" component={IdeaForm}/>
      </Switch>
    );
  }
}

export default PageContent;
