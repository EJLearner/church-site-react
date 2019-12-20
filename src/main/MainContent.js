import React from 'react';
import {Link} from 'react-router-dom';
import Slider from '../common/Slider';
import mainCalendarSquare from '../assets/main/images/main-calendar-square.png';
import mainOutReachSquare from '../assets/main/images/main-outreach-square.png';
import mainGrowSquare from '../assets/main/images/main-grow-square.png';

import routePaths from '../routePaths';

import './MainContent.css';
import DailyDevotional from './DailyDevotional';
import UpcomingEvent from './UpcomingEvent';

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

function MainContent() {
  const upcomingEvents = [
    {
      date: '2020-03-17',
      title: 'Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Children’s Church',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Palm Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    },
    {
      date: '2020-03-17',
      title: 'Sunday Service',
      lines: ['Every Sunday', '9 am - 11 am']
    }
  ];

  const allUpComingEvents = upcomingEvents.map(eventInfo => (
    <UpcomingEvent key="index" {...eventInfo} />
  ));

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
      <div className="three-boxes">
        <div>
          <Link to={routePaths.MAIN_OUTREACH}>
            <img alt="Outreach" src={mainOutReachSquare} />
          </Link>
        </div>
        <div>
          <Link to={routePaths.CE_HOME}>
            <img alt="Grow" src={mainGrowSquare} />
          </Link>
        </div>
        <div>
          <Link to={routePaths.MAIN_CALENDAR}>
            <img alt="Calendar" src={mainCalendarSquare} />
          </Link>
        </div>
      </div>
      <DailyDevotional />
      <div className="upcoming-events-area">
        <div>Upcoming Events</div>
        <div className="all-events">{allUpComingEvents}</div>
      </div>
    </>
  );
}

export default MainContent;
