import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import routePaths from '../../routePaths';

AboveContentLinks.propTypes = {
  pagePath: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  subPageTitle: PropTypes.string
};

function AboveContentLinks({pageTitle, pagePath, subPageTitle}) {
  if (subPageTitle) {
    return (
      <>
        <Link to={routePaths.MAIN_HOME}>Home</Link> /{' '}
        <Link to={pagePath}>{pageTitle}</Link> / {subPageTitle}
      </>
    );
  }

  return (
    <>
      <Link to={routePaths.MAIN_HOME}>Home</Link> / {pageTitle}
    </>
  );
}

export default AboveContentLinks;
