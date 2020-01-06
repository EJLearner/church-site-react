import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import routePaths from '../../../../routePaths';

import {
  getRegistrationData,
  getRoutePath,
  resetRegistrationData
} from '../../../../stores/lastSubmittedRegistration';

import './ThankYouPage.css';

class ThankYouPage extends Component {
  render() {
    const registrationData = getRegistrationData();
    const routePath = getRoutePath();

    return (
      <div className="page-with-padding">
        <h1>Thank you for {this.props.location.state.forMessage}</h1>
        <h2>
          {registrationData && (
            <Link to={routePath}>Register another student</Link>
          )}
        </h2>
        <h2>
          <Link onClick={resetRegistrationData} to={routePaths.CE_HOME}>
            Back To Home
          </Link>
        </h2>
      </div>
    );
  }
}

ThankYouPage.propTypes = {
  location: PropTypes.object
};

export default withRouter(ThankYouPage);
