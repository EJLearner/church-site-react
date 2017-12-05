import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TheVision from './TheVision';
import PowerPoint from './PowerPoint';
import Participants2016 from './Participants2016';
import Workgroups from './Workgroups';

import CePageLayoutA from '../Reusable/CePageLayoutA';

import '../../cePageStyles.scss';

class Vision extends Component {
  generateLinkData() {
    return [
      {
        isDefault: true,
        path: '/vision/thevision',
        render: <TheVision />,
        text: 'The Vision'
      },
      {
        path: '/vision/powerpoint',
        render: <PowerPoint />,
        text: 'PowerPoint'
      },
      {
        path: '/vision/participants2016',
        render: <Participants2016 />,
        text: '2016 Leadership Retreat Participants'
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
      <CePageLayoutA
        headerBeginning="2020"
        headerEmph="Vision"
        linkData={linkData}
      />
    );
  }
}

Vision.propTypes = {
  location: PropTypes.object
};

export default withRouter(Vision);
