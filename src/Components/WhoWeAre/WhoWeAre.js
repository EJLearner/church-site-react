import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeftLinks from '../Reusable/LeftLinks/LeftLinks';
import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';

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
  generateLinkData() {
    return [
      {path: '/who/pastor', render: <Pastor />, text: 'Pastor Yeargin'},
      {
        path: '/who/ctbc',
        render: <MinisterialStaff />,
        text: 'CTBC Ministerial Staff'
      },
      {
        path: '/who/christian-ed-staff',
        render: <ChristianEdStaff />,
        text: 'Christian Education'
      },
      {path: '/who/diaconate', render: <Diaconate />, text: 'Diaconate'},
      {path: '/who/trustees', render: <Trustees />, text: 'Trustees'},
      {
        path: '/who/handbook',
        render: <Handbook />,
        text: 'Leadership Handbook',
        children: [
          {path: '/who/finance', render: <Finance />, text: 'Finance'},
          {path: '/who/meetings', render: <Meetings />, text: 'Church Meetings'}
        ]
      }
    ];
  }

  renderRoutes(routeData) {
    const routes = [];
    routeData.forEach(route => {
      routes.push(
        <Route
          key={route.path}
          path={route.path}
          render={_.constant(route.render)}
        />
      );

      if (route.children) {
        routes.push(...this.renderRoutes(route.children));
      }
    });
    return <Switch>{routes}</Switch>;
  }

  render() {
    const linkData = this.generateLinkData();

    return (
      <div id="flush-left-content">
        <div>
          <h1>
            Who We <span className="emphwelcomeline">Are</span>
          </h1>
        </div>

        <div className="left-links">
          <LeftLinks
            linkData={linkData}
            pathname={this.props.location.pathname}
          />
        </div>
        <div className="right-content">
          <SubPageSwitch linkData={linkData} />
        </div>
      </div>
    );
  }
}

WhoWeAre.propTypes = {
  location: PropTypes.object
};

export default withRouter(WhoWeAre);
