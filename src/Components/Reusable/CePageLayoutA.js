import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeftLinks from './LeftLinks/LeftLinks';
import SubPageSwitch from './SubPageSwitch/SubPageSwitch';

import '../../cePageStyles.scss';

class CePageLayoutA extends Component {
  render() {
    return (
      <div id="ce-page">
        <h1>
          {this.props.headerBeginning}{' '}
          <span className="emphwelcomeline">{this.props.headerEmph}</span>
        </h1>
        <div className="ce-page-links-content">
          <div className="ce-page-left-content">
            <LeftLinks
              linkData={this.props.linkData}
              pathname={this.props.location.pathname}
            />
          </div>
          <div className="ce-page-right-content">
            <SubPageSwitch linkData={this.props.linkData} />
          </div>
        </div>
      </div>
    );
  }
}

CePageLayoutA.propTypes = {
  // first part of h1 for page title
  headerBeginning: PropTypes.string.isRequired,
  // second part of h1 for page title
  headerEmph: PropTypes.string.isRequired,
  // linkdata paths used for left links and routes
  linkData: PropTypes.arrayOf(
    PropTypes.shape({
      isDefault: PropTypes.bool,
      path: PropTypes.string,
      render: PropTypes.node,
      text: PropTypes.string
    })
  ).isRequired,
  // location object from router
  location: PropTypes.object
};

export default withRouter(CePageLayoutA);
