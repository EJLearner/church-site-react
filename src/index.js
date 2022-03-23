import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';

import 'font-awesome/css/font-awesome.css';

import './firebase';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
