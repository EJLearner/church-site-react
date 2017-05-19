// import Slider from './Slider/Slider'
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home'
import WhoWeAre from '../WhoWeAre/WhoWeAre'
import Why from '../Why/Why'
import Where from '../Where/Where'
import What from '../What/What'
import IdeaForm from '../IdeaForm/IdeaForm'


class PageContent extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home}/>
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
