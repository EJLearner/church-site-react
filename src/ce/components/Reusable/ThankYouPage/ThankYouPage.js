import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import routePaths from '../../../../routePaths';
import _ from 'lodash';

import './ThankYouPage.css';

class ThankYouPage extends Component {
  constructor(props) {
    super(props);

    this._renderMoreStuff = this._renderMoreStuff.bind(this);
  }

  _renderMoreStuff() {
    return <div>{this.props.moreStuff}</div>;
  }

  render() {
    return (
      <div className="page-with-padding">
        <h1>Thank you for {this.props.location.state.forMessage}</h1>
        <h2>
          <Link to={routePaths.CE_HOME}>Back To Home</Link>
        </h2>
      </div>
    );
  }
}

ThankYouPage.defaultProps = {
  moreStuff: 'Default more stuff'
};

ThankYouPage.propTypes = {
  moreStuff: PropTypes.string
};

export default withRouter(ThankYouPage);
