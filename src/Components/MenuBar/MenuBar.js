import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import churchLogo from './chrisedtopbanner.png'

import styles from './MenuBar.css'

class MenuBar extends Component {
  render() {
    console.log(this.props.location);

    const links = [
      {
        path: '/',
        text: 'Home'
      }, {
        path: '/who',
        text: `Who We are`,
      }, {
        path: '/why',
        text: `Why We Are Here`,
      }, {
        path: '/where',
        text: `Where We Are Going`,
      }, {
        path: '/calendar',
        text: `Calendar`,
      }, {
        path: '/what',
        text: `What's In Store`,
      }, {
        path: '/ideaform',
        text: `Tell Us What You Think`,
      },
    ];

    const renderedLinks = links.map((link) => {
      console.log(link.path, this.props.location.pathname)
      const className = link.path === this.props.location.pathname ? 'current-page-link' : null;
      return (
        <li key={link.path} className={className}>
          <Link to={link.path}>{link.text}</Link>
        </li>
      );
    })

    return (
      <div id="menubar">
        <ul className="cfm">
          {renderedLinks}
        </ul>
        <div className="logo">
          <img src={churchLogo}  alt=""/>
        </div>
      </div>
    );
  }
}

export default withRouter(MenuBar);
