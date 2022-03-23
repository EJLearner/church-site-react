
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import EventsListPage from './DeprecatedEventsListPage';

import './Calendar.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils';
import withDatesSubscription from '../Hocs/withDatesSubscription';

class CalendarUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};

    this.getDates = this.getDates.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(dayString) {
    this.setState({selectedDay: dayString});
  }

  getDates(maxEvents) {
    const dates = [];

    let eventCount = 0;
    // just to avoid runtime errors if events don't exist
    let loopCount = 0;
    const currentDayMoment = moment(this.state.selectedDay);
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
        dates={this.getDates(10)}
        onDateChange={this.onDateChange}
        pageTitle="Upcoming Events"
        selectedDay={this.state.selectedDay}
        storedDates={this.props.storedDates}
      />
    );
  }
}

CalendarUpcoming.propTypes = {
  storedDates: PropTypes.object
};

export default withDatesSubscription(CalendarUpcoming);
