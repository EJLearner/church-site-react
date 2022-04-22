import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import withDatesSubscription from '../Hocs/withDatesSubscription';

import EventsListPage from './DeprecatedEventsListPage';

class CalendarDay extends Component {
  constructor(props) {
    super(props);

    const dayFromRouter = _.get(this.props.location, 'state.selectedDay');

    this.state = {selectedDay: dayFromRouter || moment().format('YYYY-MM-DD')};

    this._onDateChange = this._onDateChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({selectedDay: nextProps.selectedDay});
  }

  _onDateChange(dayString) {
    this.setState({selectedDay: dayString});
  }

  render() {
    const currentDayMoment = moment();
    const selectedDayMoment = moment(this.state.selectedDay, 'YYYY-MM-DD');

    const currentDaySelected = selectedDayMoment.isSame(
      currentDayMoment,
      'day'
    );

    const pageTitle = currentDaySelected
      ? 'Today’s Events'
      : `Events for ${selectedDayMoment.format('MMMM DD, YYYY')}`;

    return (
      <EventsListPage
        dates={[this.state.selectedDay]}
        onDateChange={this._onDateChange}
        pageTitle={pageTitle}
        selectedDay={this.state.selectedDay}
        storedDates={this.props.storedDates}
      />
    );
  }
}

CalendarDay.propTypes = {
  location: PropTypes.object.isRequired,
  selectedDay: PropTypes.string,
  storedDates: PropTypes.object
};

CalendarDay.defaultProps = {
  selectedDay: moment().format('YYYY-MM-DD')
};

export default withRouter(withDatesSubscription(CalendarDay));
