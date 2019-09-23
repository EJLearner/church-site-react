import React from 'react';
import {Link} from 'react-router-dom';
import Slider from '../common/Slider';

import routePaths from '../routePaths';

import './MainContent.css';

const allPictures = [
  {
    altTag: 'Christ Is Risen: Celebrate the Savior',
    annual: true,
    displayBeg: '2018-03-01',
    displayEnd: '2018-05-01',
    source: require('../assets/ce/images/slides/christian-ed-home-christ-risen.png')
  },
  {
    altTag:
      'o be a good father and mother requires that the parents defer many of ' +
      'their own needs and desires in favor of the needs of their children. As a ' +
      'consequence of this sacrifice, conscientious parents develop a nobility of ' +
      'character and learn to put into practice the selfless truths taught by the Savior Himself. Quote from Robert Faust' +
      'Mother’s Day Service May 13' +
      'Father’s Day Service June 17',
    displayBeg: '2018-05-01',
    displayEnd: '2018-06-20',
    source: require('../assets/ce/images/slides/christian-ed-home-mothers-fathers.png')
  },
  {
    altTag: 'Children’s Church - Every Second Sunday',
    source: require('../assets/ce/images/slides/home-childrens-church.png')
  },
  {
    altTag: 'Bible Study - Every Tuesday at 7:30 PM and Every Saturday at Noon',
    source: require('../assets/ce/images/slides/christian-ed-home-bible-study.png')
  }
];

class MainContent extends React.Component {
  render() {
    return (
      <>
        <Slider pictures={allPictures} />
        <div className="stream-services">
          <Link to={routePaths.MAIN_HOME}>
            Missed A Sunday? Stream Our services
            <br />
            <span className="further-info">
              Stream current Sunday service or download past sermons.
            </span>
          </Link>
        </div>
        <ul>
          <li>Two pictures and calendar</li>
          <li>Daily devotional</li>
          <li>Upcoming Events</li>
        </ul>
      </>
    );
  }
}

export default MainContent;
