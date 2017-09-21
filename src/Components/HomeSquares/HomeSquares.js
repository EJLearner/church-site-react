import React from 'react';
import PropTypes from 'prop-types';

import Announcements from '../Announcements/Announcements.js';

import './HomeSquares.css';

import calendarPic from './calendar.png';
import kidsPic from './kids.jpg';
import leadershipPic from './leadership.png';

const HomeSquare = props => {
  const scrollClass = props.scroll ? ' scroll' : '';
  const classNames = 'home-square' + scrollClass;

  return (
    <div className={classNames}>
      <h2>
        <span>{props.title}</span>
      </h2>
      {props.children}
    </div>
  );
};

const HomeSquares = props => {
  return (
    <div className="home-page-bottom-content">
      <HomeSquare scroll title="Announcements">
        <Announcements />
      </HomeSquare>

      <HomeSquare title="Youth Ministries">
        <img src={kidsPic} alt="Children" />
      </HomeSquare>

      <HomeSquare title="Leadership">
        <img src={leadershipPic} alt="Leadership" />
      </HomeSquare>

      <HomeSquare title="Calendar">
        <img src={calendarPic} alt="Calendar" />
      </HomeSquare>
    </div>
  );
};

HomeSquare.propTypes = {
  children: PropTypes.node.isRequired,
  scroll: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default HomeSquares;
