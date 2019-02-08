import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

import TheVision from './TheVision';
import PowerPoint from './PowerPoint';
import Participants2016 from './Participants2016';
import Workgroups from './Workgroups';

import CePageLayout from '../Reusable/CePageLayout';

import '../../cePageStyles.scss';

class Vision extends Component {
  generateLinkData() {
    return [
      {
        isDefault: true,
        pathKey: 'CE_VISION_THE_VISION',
        render: <TheVision />,
        text: 'The Vision'
      },
      {
        pathKey: 'CE_VISION_POWERPOINT',
        render: <PowerPoint />,
        text: 'PowerPoint'
      },
      {
        pathKey: 'CE_VISION_PARTICIPANTS_2016',
        render: <Participants2016 />,
        text: '2016 Leadership Retreat Participants'
      },
      {
        pathKey: 'CE_VISION_WORKGROUPS',
        render: <Workgroups />,
        text: 'Workgroups'
      }
    ];
  }

  renderRoutes(routeData) {
    const routes = [];
    routeData.forEach(route => {
      routes.push(
        <Route key={route.path} path={route.path} render={() => route.render} />
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
      <CePageLayout
        headerBeginning="2020"
        headerEmph="Vision"
        linkData={linkData}
      />
    );
  }
}

export default withRouter(Vision);
