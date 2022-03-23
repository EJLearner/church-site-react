import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import routePaths from '../../../routePaths';
import Announcements from '../Announcements/Announcements.jsx';

import './HomeSquares.css';

import calendarPic from '../../../assets/ce/images/homepage/calendar.png';
import kidsPic from '../../../assets/ce/images/homepage/kids.jpg';
import leadershipPic from '../../../assets/ce/images/homepage/leadership.png';

const HomeSquare = (props) => {
  const {children, linkTo, scroll, title} = props;

  const scrollClass = scroll ? ' scroll' : '';
  const classNames = `home-square${scrollClass}`;

  return (
    <div className={classNames}>
      <h2>
        <span>{title}</span>
      </h2>
      {linkTo ? <Link to={linkTo}>{children}</Link> : children}
    </div>
  );
};

const HomeSquares = () => {
  return (
    <div className="home-page-bottom-content">
      <HomeSquare scroll title="Announcements">
        <Announcements />
      </HomeSquare>

      <HomeSquare
        linkTo={routePaths.CE_YOUTH_CHILDRENS_CHURCH}
        title="Children’s Church"
      >
        <img alt="Children" src={kidsPic} />
      </HomeSquare>

      <HomeSquare linkTo={routePaths.CE_WHO} title="Leadership">
        <img alt="Leadership" src={leadershipPic} />
      </HomeSquare>

      <HomeSquare linkTo={routePaths.CE_CALENDAR_MONTH} title="Calendar">
        <img alt="Calendar" src={calendarPic} />
      </HomeSquare>
    </div>
  );
};

HomeSquare.propTypes = {
  children: PropTypes.node.isRequired,
  linkTo: PropTypes.string,
  scroll: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default HomeSquares;
