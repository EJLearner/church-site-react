import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import churchLogo from './chrisedtopbanner.png';

import './MenuBar.css';

class MenuBar extends Component {
  render() {
    const links = [
      {
        path: '/',
        text: 'Home'
      },
      {
        path: '/who',
        text: `Who We are`
      },
      {
        path: '/why',
        text: `Why We Are Here`
      },
      {
        path: '/where',
        text: `Where We Are Going`
      },
      {
        path: '/calendar',
        text: `Calendar`
      },
      {
        path: '/what',
        text: `What's In Store`
      },
      {
        path: '/ideaform',
        text: `Tell Us What You Think`
      }
    ];

    const renderedLinks = links.map(link => {
      const {pathname} = this.props.location;
      let className = link.path === pathname ? 'current-page-link' : null;
      const isHomePage = !pathname || pathname === '/christianedu.html';
      if (link.path === '/' && isHomePage) {
        className = 'current-page-link';
      }
      return (
        <li key={link.path} className={className}>
          <Link to={link.path}>{link.text}</Link>
        </li>
      );
    });

    return (
      <div id="menubar">
        <ul className="cfm">{renderedLinks}</ul>
        <div className="logo">
          <img src={churchLogo} alt="" />
        </div>
      </div>
    );
  }
}

export default withRouter(MenuBar);
