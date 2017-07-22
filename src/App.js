import React, { Component } from 'react';

import MenuBar from './Components/MenuBar/MenuBar'
import Footer from './Components/Footer/Footer'
import PageContent from './Components/PageContent/PageContent'
import Quote from './Components/Quote/Quote'
import TitleBar from './Components/TitleBar/TitleBar'

import './App.css';

class App extends Component {
  render() {
    return (
      <div id='top-react-div'>
        <TitleBar />
        <MenuBar />
        <PageContent />
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default App;
