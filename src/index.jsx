import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.css';
import {BrowserRouter} from 'react-router-dom';

import 'react-app-polyfill/ie11'; // For IE 11 support
import './firebase';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
