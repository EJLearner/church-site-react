import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import moment from 'moment';
import _ from 'lodash';

class CcAdmin extends Component {
  constructor(props) {
    super(props);

    this._renderMoreStuff = this._renderMoreStuff.bind(this);
  }

  _renderMoreStuff() {
    return <div>{this.props.moreStuff}</div>;
  }

  render() {
    return <div>Stuff{this._renderMoreStuff()}</div>;
  }
}

CcAdmin.defaultProps = {
  moreStuff: 'Default more stuff'
};

CcAdmin.propTypes = {
  moreStuff: PropTypes.string
};

export default withRouter(CcAdmin);
