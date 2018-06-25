import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import moment from 'moment';
import _ from 'lodash';

class Template extends Component {
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

Template.defaultProps = {
  moreStuff: 'Default more stuff'
};

Template.propTypes = {
  moreStuff: PropTypes.string
};

export default withRouter(Template);
