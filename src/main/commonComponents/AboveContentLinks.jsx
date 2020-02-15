import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import routePaths from '../../routePaths';

import styled from 'styled-components';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const AboveContentLinksStyle = styled.div`
  padding-left: 1em;
  padding-top: 1em;

  a {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

AboveContentLinks.propTypes = {
  pagePath: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  subPageTitle: PropTypes.string
};

function AboveContentLinks({pageTitle, pagePath, subPageTitle}) {
  if (subPageTitle) {
    return (
      <AboveContentLinksStyle>
        <Link to={routePaths.MAIN_HOME}>Home</Link> /{' '}
        <Link to={pagePath}>{pageTitle}</Link> / {subPageTitle}
      </AboveContentLinksStyle>
    );
  }

  return (
    <AboveContentLinksStyle>
      <Link to={routePaths.MAIN_HOME}>Home</Link> / {pageTitle}
    </AboveContentLinksStyle>
  );
}

export default AboveContentLinks;
