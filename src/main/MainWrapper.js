import React from 'react';
import MainFooter from './MainFooter';
import MainMenubar from './MainMenubar';

class MainHome extends React.Component {
  render() {
    return (
      <>
        <p>Forms/MemberLogin links</p>
        <MainMenubar />
        Within Switch:
        <ul>
          <li>Slideshow</li>
          <li>Stream Box</li>
          <li>Two pictures and calendar</li>
          <li>Daily devotional</li>
          <li>Upcoming Events</li>
        </ul>
        <MainFooter />
      </>
    );
  }
}

export default MainHome;
