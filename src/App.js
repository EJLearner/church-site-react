import React, {Component} from 'react';
import moment from 'moment';
import './polyfills';

import Routes from './Routes';

class App extends Component {
  render() {
    moment.updateLocale('en', {
      meridiem: hour => (hour < 12 ? 'a.m.' : 'p.m.')
    });

    return <Routes />;
  }
}

export default App;
