import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import mainCalendarSquare from '../assets/main/images/main-calendar-square.png';
import mainOutReachSquare from '../assets/main/images/main-outreach-square.png';
import mainGrowSquare from '../assets/main/images/main-grow-square.png';

import routePaths from '../routePaths';

import './MainContent.css';
import DailyDevotional from './DailyDevotional';
import UpcomingEvent from './UpcomingEvent';

function MainContent() {
  const upcomingEvents = [
    {
      date: '2019-03-17',
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

  const eventsToShow = 4;
  const allUpComingEvents = upcomingEvents.reduce(
    (currentUpcomingEvents, eventInfo, index) => {
      const atDisplayLimit = currentUpcomingEvents.length >= eventsToShow;
      const dateIsAfterToday = eventInfo.date > moment().format('YYYY-MM-DD');

      if (!atDisplayLimit && dateIsAfterToday) {
        currentUpcomingEvents.push(
          <UpcomingEvent key="index" {...eventInfo} />
        );
      }

      return currentUpcomingEvents;
    },
    []
  );

  return (
    <>
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
        <h3>Upcoming Events</h3>
        <div className="all-events">{allUpComingEvents}</div>
      </div>
    </>
  );
}

export default MainContent;
