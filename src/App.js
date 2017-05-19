import React, { Component } from 'react';
import './App.css';
import TopLogo from './TopLogo/TopLogo'
import MenuBar from './MenuBar/MenuBar'
import Footer from './Footer/Footer'
import PageContent from './PageContent/PageContent'
import Quote from './Quote/Quote'

class App extends Component {
  render() {
    return (
      <div id='top-react-div'>
        <TopLogo />
        <MenuBar />
        <PageContent />
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default App;
