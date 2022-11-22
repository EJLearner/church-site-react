import moment from 'moment';
import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';

import TopRoutes from './TopRoutes.jsx';
import './polyfills';
import './App.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --sans-serif: Calibri, 'Segoe UI', Candara, Segoe, Optima, Arial, sans-serif;
    --serif: cambria, georgia, 'bookman old style', 'times new roman', serif;

    --black: black;
    --white: white;
    --gossamer-veil: rgb(240, 238, 235);
    --charcoal-grey: rgb(38, 38, 38);

    --background: var(--black);
    --content: var(--white);

    --standard-background: var(--background);
    --standard-text: var(--content);
    --text-on-light-background: var(--black);
    --accent-background: rgb(255,192,0);
    --accent-content: var(--text-on-light-background);

    // absolute colors shouldn't be used past this point
    --standard-border: var(--content);
    --top-content-background: var(--white);
    --top-content-text: var(--text-on-light-background);
    --second-content-background: var(--gossamer-veil);
    --second-content-text: var(--text-on-light-background);
    --alternate-background-text: var(--charcoal-grey);
    --gutter-space: 64px;

    body {
      background-color: var(--standard-background);
      height: 100%;
      padding: 0px;
      margin: 0px;
    }

    #root {
      color: var(--standard-text);
      height: 100%;
    }

    a {
      color: var(--standard-text);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    h1,h2,h3,h4,h5, h6 {
      font-family: var(--serif);
    }

    input, select {
      border: 1px solid var(--black);
      border-radius: 0;
      font-size: 14px;
      padding: 0.2em;

      font-size: 20px;
      padding: 6px;
    }

  }
`;

class App extends Component {
  render() {
    moment.updateLocale('en', {
      meridiem: (hour) => (hour < 12 ? 'am' : 'pm')
    });

    return (
      <>
        <GlobalStyle />
        <TopRoutes />
      </>
    );
  }
}

export default App;
