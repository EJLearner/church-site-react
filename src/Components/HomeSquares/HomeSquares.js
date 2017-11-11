import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import Announcements from '../Announcements/Announcements.js';

import './HomeSquares.css';

import calendarPic from './calendar.png';
import kidsPic from './kids.jpg';
import leadershipPic from './leadership.png';

const HomeSquare = props => {
  const {children, linkTo, scroll, title} = props;

  const scrollClass = scroll ? ' scroll' : '';
  const classNames = 'home-square' + scrollClass;

  return (
    <div className={classNames}>
      <h2>
        <span>{title}</span>
      </h2>
      {linkTo ? <Link to={linkTo}>{children}</Link> : children}
    </div>
  );
};

const HomeSquares = props => {
  return (
    <div className="home-page-bottom-content">
      <HomeSquare scroll title="Announcements">
        <Announcements />
      </HomeSquare>

      <HomeSquare linkTo="/youth" title="Youth Ministries">
        <img alt="Children" src={kidsPic} />
      </HomeSquare>

      <HomeSquare linkTo="/who" title="Leadership">
        <img alt="Leadership" src={leadershipPic} />
      </HomeSquare>

      <HomeSquare linkTo="/calendar" title="Calendar">
        <img alt="Calendar" src={calendarPic} />
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
