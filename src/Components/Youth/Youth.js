import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeftLinks from '../Reusable/LeftLinks/LeftLinks';
import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';

import Ushers from './Ushers';
import GodsGifts from './GodsGifts';
import SundaySchool from './SundaySchool';
import ChildrensChurch from './ChildrensChurch';
import VacationBibleSchool from './VacationBibleSchool';

import '../../cePageStyles.scss';

class Youth extends Component {
  generateLinkData() {
    return [
      {
        isDefault: true,
        path: '/youth/ushers',
        render: <Ushers />,
        text: 'Youth & Young Adult Ushers'
      },
      {
        path: '/youth/godsgifts',
        render: <GodsGifts />,
        text: 'God’s Gifts'
      },
      {
        path: '/youth/sundayschool',
        render: <SundaySchool />,
        text: 'Sunday School'
      },
      {
        path: '/youth/childrenschurch',
        render: <ChildrensChurch />,
        text: 'Children’s Church'
      },
      {
        path: '/youth/vacationbibleschool',
        render: <VacationBibleSchool />,
        text: 'Vacation Bible School'
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
      <div id="ce-page">
        <h1>City Temple Youth</h1>
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

Youth.propTypes = {
  location: PropTypes.object
};

export default withRouter(Youth);
