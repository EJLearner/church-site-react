import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import LeftLinks from './LeftLinks/LeftLinks';
import SubPageSwitch from './SubPageSwitch/SubPageSwitch';

import '../../cePageStyles.scss';

class CePageLayout extends Component {
  render() {
    const {linkData, headerEmph, headerBeginning, location} = this.props;

    return (
      <div id="ce-page">
        <h1>
          {headerBeginning}{' '}
          <span className="emphwelcomeline">{headerEmph}</span>
        </h1>
        <div className="ce-page-links-content">
          <div className="ce-page-left-content">
            <LeftLinks linkData={linkData} pathname={location.pathname} />
          </div>
          <div className="ce-page-right-content">
            <SubPageSwitch linkData={linkData} />
          </div>
        </div>
      </div>
    );
  }
}

CePageLayout.propTypes = {
  // first part of h1 for page title
  headerBeginning: PropTypes.string.isRequired,
  // second part of h1 for page title
  headerEmph: PropTypes.string.isRequired,
  // linkdata paths used for left links and routes
  linkData: PropTypes.arrayOf(
    PropTypes.shape({
      isDefault: PropTypes.bool,
      path: PropTypes.string,
      pathKey: PropTypes.string,
      render: PropTypes.node,
      text: PropTypes.string
    })
  ).isRequired,
  // location object from router
  location: PropTypes.object
};

export default withRouter(CePageLayout);
