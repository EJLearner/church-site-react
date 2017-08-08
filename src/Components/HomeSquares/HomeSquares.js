import React from 'react';
import PropTypes from 'prop-types';

import './HomeSquares.css';

const HomeSquare = (props) => {
  return (
    <div>
      <h2><span>{props.title}</span></h2>
      {props.children}
    </div>
  );
};

const HomeSquares = (props) => {
  return (
    <div className="home-page-bottom-content">
      <HomeSquare title="Announcements">
        <div>Test Content</div>
      </HomeSquare>

      <HomeSquare title="Youth Ministries">
        <div>Test Content</div>
      </HomeSquare>

      <HomeSquare title="Leadership">
        <div>Test Content</div>
      </HomeSquare>

      <HomeSquare title="Calendar">
        <div>Test Content</div>
      </HomeSquare>

    </div>
  );
};

HomeSquare.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default HomeSquares;
