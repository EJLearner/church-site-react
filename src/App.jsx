import React, {Component} from 'react';
import moment from 'moment';
import './polyfills';

import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    moment.updateLocale('en', {
      meridiem: hour => (hour < 12 ? 'am' : 'pm')
    });

    return <Routes />;
  }
}

export default App;
