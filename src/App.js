import React, { Component } from 'react';
import './App.css';
import TopLogo from './TopLogo/TopLogo'
import MenuBar from './MenuBar/MenuBar'
import Slider from './Slider/Slider'
import Quote from './Quote/Quote'
import Footer from './Footer/Footer'

class App extends Component {
  render() {
    return (
      <div id='top-react-div'>
        <TopLogo />
        <MenuBar />
        <Slider />
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default App;
