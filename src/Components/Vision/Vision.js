import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeftLinks from '../Reusable/LeftLinks/LeftLinks';
import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';

import TheVision from './TheVision';
// import Retreat2018 from './Retreat2018';
import PowerPoint from './PowerPoint';
import Participants2018 from './Participants2018';
import Workgroups from './Workgroups';

import '../../cePageStyles.scss';

class Vision extends Component {
  generateLinkData() {
    return [
      {
        altPath: '/vision',
        isDefault: true,
        path: '/vision/thevision',
        render: <TheVision />,
        text: 'The Vision'
      },
      // {
      //   path: '/vision/retreat2018',
      //   render: <Retreat2018 />,
      //   text: '2018 Retreat'
      // },
      {
        path: '/vision/powerpoint',
        render: <PowerPoint />,
        text: 'PowerPoint'
      },
      {
        path: '/vision/participants2018',
        render: <Participants2018 />,
        text: '2018 Leadership Retreat Participants'
      },
      {path: '/vision/workgroups', render: <Workgroups />, text: 'Workgroups'}
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
      <div id="ce-page-left-content">
        <h1>
          2020 <span className="emphwelcomeline">Vision</span>
        </h1>
        <LeftLinks
          linkData={linkData}
          pathname={this.props.location.pathname}
        />
        <div className="ce-page-right-content">
          <SubPageSwitch linkData={linkData} />
        </div>
      </div>
    );
  }
}

Vision.propTypes = {
  location: PropTypes.object
};

export default withRouter(Vision);
