import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import ChristianEdStaff from './ChristianEdStaff';
import Pastor from './Pastor';
import Diaconate from './Diaconate';
import Finance from './Finance';
import Handbook from './Handbook';
import Meetings from './Meetings';
import MinisterialStaff from './MinisterialStaff';
import Trustees from './Trustees';

import './WhoWeAre.css';

class WhoWeAre extends Component {
  render() {
    const links = [
      {path: '/who/pastor', text: 'Pastor Yeargin'},
      {path: '/who/ctbc', text: 'CTBC Ministerial Staff'},
      {path: '/who/christian-ed-staff', text: 'Christian Education'},
      {path: '/who/diaconate', text: 'Diaconate'},
      {path: '/who/trustees', text: 'Trustees'},
      {
        path: '/who/handbook',
        text: 'Leadership Handbook',
        children: [
          {path: '/who/finance', text: 'Finance'},
          {path: '/who/meetings', text: 'Church Meetings'}
        ]
      }
    ];

    const renderedLinks = links => {
      if (!links) {
        return null;
      }

      const listItems = links.map(link => {
        const {path, text} = link;
        const {pathname} = this.props.location;
        const className = path === pathname ? 'current-page-link' : null;
        return [
          <li className={className} key={path}>
            <Link to={path}>{text}</Link>
          </li>,
          renderedLinks(link.children)
        ];
      });

      return <ul>{listItems}</ul>;
    };

    return (
      <div id="flush-left-content">
        <div>
          <h1>
            Who We <span className="emphwelcomeline">Are</span>
          </h1>
        </div>

        <div className="left-links">{renderedLinks(links)}</div>
        <div className="right-content">
          <Switch>
            <Route
              path="/who/pastor"
              render={() => {
                return <Pastor />;
              }}
            />
            <Route
              path="/who/ctbc"
              render={() => {
                return <MinisterialStaff />;
              }}
            />
            <Route
              path="/who/christian-ed-staff"
              render={() => {
                return <ChristianEdStaff />;
              }}
            />
            <Route
              path="/who/diaconate"
              render={() => {
                return <Diaconate />;
              }}
            />{' '}
            <Route
              path="/who/trustees"
              render={() => {
                return <Trustees />;
              }}
            />
            <Route
              path="/who/handbook"
              render={() => {
                return <Handbook />;
              }}
            />
            <Route
              path="/who/finance"
              render={() => {
                return <Finance />;
              }}
            />
            <Route
              path="/who/meetings"
              render={() => {
                return <Meetings />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

WhoWeAre.propTypes = {
  location: PropTypes.object
};

export default withRouter(WhoWeAre);
