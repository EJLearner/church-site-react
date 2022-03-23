import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const AboveContentLinksStyle = styled.div`
  font-size: 11px;
  padding-left: 1em;
  padding-top: 1em;
  padding-bottom: 1em;

  a {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

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

AboveContentLinks.propTypes = {
  pagePath: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  subPageTitle: PropTypes.string
};

export default AboveContentLinks;
