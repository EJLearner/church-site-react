import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import _ from 'lodash';

import moment from 'moment';

import EventsListPage from './EventsListPage';

class CalendarDay extends Component {
  constructor(props) {
    super(props);

    const dayFromRouter = _.get(this.props.location, 'state.selectedDay');

    this.state = {selectedDay: dayFromRouter || moment().format('YYYY-MM-DD')};

    this._onDateChange = this._onDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selectedDay: nextProps.selectedDay});
  }

  _onDateChange(dayString) {
    this.setState({selectedDay: dayString});
  }

  render() {
    return (
      <EventsListPage
        dates={[this.state.selectedDay]}
        onDateChange={this._onDateChange}
        pageTitle="Today’s Events"
        selectedDay={this.state.selectedDay}
      />
    );
  }
}

CalendarDay.propTypes = {
  location: PropTypes.object.isRequired,
  selectedDay: PropTypes.string
};

CalendarDay.defaultProps = {
  selectedDay: moment().format('YYYY-MM-DD')
};

export default withRouter(CalendarDay);
