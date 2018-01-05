import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

const SubPageSwitch = props => {
  const makeRoutes = linkData => {
    const routes = [];
    linkData.forEach(route => {
      routes.push(
        <Route key={route.path} path={route.path} render={() => route.render} />
      );

      if (route.children) {
        routes.push(...makeRoutes(route.children));
      }
    });

    const defaultRoute = linkData.find(route => route.isDefault);
    if (defaultRoute) {
      routes.push(
        <Route key={'defaultRoute'} render={() => defaultRoute.render} />
      );
    }

    return routes;
  };

  return <Switch>{makeRoutes(props.linkData)}</Switch>;
};

SubPageSwitch.propTypes = {
  linkData: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      render: PropTypes.node
    })
  ).isRequired
};

export default SubPageSwitch;
