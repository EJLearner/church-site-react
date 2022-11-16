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

    --green-20: rgb(146, 208, 80);
    --green-50: rgb(115, 175, 85);
    --green-80: rgb(102, 158, 74);
    --orange: orange;
    --peach: rgb(255, 230, 149);
    --gray41: rgb(41, 41, 41);
    --gray63: rgb(63, 63, 63);
    --gray77: rgb(77, 77, 77);
    --gray83: rgb(83, 83, 83);
    --gray95: #5f5f5f;
    --gray180: rgb(180, 180, 180);
    --gray217: rgb(217, 217, 217);
    --light-blue: #5b9bd5;
    --lighter-blue: rgb(190, 215, 239);
    --blue-50: rgb(157, 195, 230);
    --black: black;
    --white: white;
    --red: red;
    --yellow: yellow;
    --maroon: maroon;
    --green: green;
    --gray: gray;

    --standard-background: var(--white);
    --standard-text: var(--black);
    --text-on-dark: var(--white);

    --ct-primary: rgb(255,192,0);
    --ct-text-on-primary: var(--standard-text);
    --ct-accent: #00bae2;
    --ct-second: #ff9b71;
    --ct-third: #d2b48c;

    --gutter-space: 64px;

    h1,h2,h3,h4,h5, h6 {
      font-family: var(--serif);
    }

    color: var(--text-on-dark)
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
