import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import EventsListPage from './EventsListPage';

import './Calendar.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils';
import withDatesSubscription from '../Hocs/withDatesSubscription';

class CalendarUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};

    this._getDates = this._getDates.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
  }

  _onDateChange(dayString) {
    this.setState({selectedDay: dayString});
  }

  _getDates(maxEvents) {
    let dates = [];

    let eventCount = 0;
    // just to avoid runtime errors if events don't exist
    let loopCount = 0;
    let currentDayMoment = moment(this.state.selectedDay);
    while (eventCount < maxEvents && loopCount < 365) {
      const dateString = currentDayMoment.format('YYYY-MM-DD');
      const daysEvents = calendarDatesUtils.getEventsForDate(
        this.props.storedDates,
        dateString
      );

      const daysEventsCount = daysEvents.length;

      if (daysEventsCount) {
        eventCount += daysEvents.length;
        dates.push(dateString);
      }

      loopCount++;
      currentDayMoment.add(1, 'day');
    }

    return dates;
  }

  render() {
    return (
      <EventsListPage
        dates={this._getDates(10)}
        onDateChange={this._onDateChange}
        pageTitle="Upcoming Events"
        selectedDay={this.state.selectedDay}
        storedDates={this.props.storedDates}
      />
    );
  }
}

CalendarUpcoming.propTypes = {
  storedDates: PropTypes.any
};

export default withDatesSubscription(CalendarUpcoming);
