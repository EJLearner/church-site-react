import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import routePaths from '../../../../routePaths';
import commonUtils from '../../../../utils/commonUtils';

const SubPageSwitch = (props) => {
  const {linkData} = props;

  const makeRoutes = (linkData) => {
    const routes = [];
    linkData.forEach(({children, path, pathKey, render}) => {
      const computedPath = commonUtils.getComputedPath(path, pathKey);

      routes.push(
        <Route key={computedPath} path={computedPath}>
          {() => render}
        </Route>
      );

      if (pathKey) {
        const oldPathNamesKey = `OLD_PATHS_${pathKey}`;
        // eslint-disable-next-line no-prototype-builtins
        if (routePaths.hasOwnProperty(oldPathNamesKey)) {
          routePaths[oldPathNamesKey].forEach((oldPath) => {
            routes.push(
              <Route
                key={oldPath}
                path={oldPath}
                render={() => <Redirect to={computedPath} />}
              />
            );
          });
        }
      }

      if (children) {
        routes.push(...makeRoutes(children));
      }
    });

    const defaultRoute = linkData.find(({isDefault}) => isDefault);
    if (defaultRoute) {
      routes.push(
        <Route key="defaultRoute">{() => defaultRoute.render}</Route>
      );
    }

    return routes;
  };

  return <Switch>{makeRoutes(linkData)}</Switch>;
};

SubPageSwitch.propTypes = {
  linkData: PropTypes.arrayOf(
    PropTypes.shape({
      isDefault: PropTypes.bool,
      path: PropTypes.string,
      pathKey: PropTypes.string,
      render: PropTypes.node
    })
  ).isRequired
};

export default SubPageSwitch;
