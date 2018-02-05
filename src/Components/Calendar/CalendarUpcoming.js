import React, {Component} from 'react';

import moment from 'moment';

import EventsListPage from './EventsListPage';

import './Calendar.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils';

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
      const daysEvents = calendarDatesUtils.getEventsForDate(dateString);
      eventCount += daysEvents.length;
      loopCount++;

      dates.push(dateString);
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
      />
    );
  }
}

export default CalendarUpcoming;
