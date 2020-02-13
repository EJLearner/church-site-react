import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import EventsListPage from './EventsListPage';
import calendarDatesUtils from '../../../ce/utils/calendarDatesUtils';
import withDatesSubscription from '../../../ce/components/Hocs/withDatesSubscription';

function getDates(maxEvents, selectedDay, storedDates) {
  let dates = [];

  let eventCount = 0;
  // just to avoid runtime errors if events don't exist
  let loopCount = 0;
  let selectedDayMoment = moment(selectedDay);
  while (eventCount < maxEvents && loopCount < 365) {
    const dateString = selectedDayMoment.format('YYYY-MM-DD');
    const daysEvents = calendarDatesUtils.getEventsForDate(
      storedDates,
      dateString
    );

    const daysEventsCount = daysEvents.length;

    if (daysEventsCount) {
      eventCount += daysEvents.length;
      dates.push(dateString);
    }

    loopCount++;
    selectedDayMoment.add(1, 'day');
  }

  return dates;
}

class CalendarUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};
  }

  render() {
    const {selectedDay} = this.state;
    const {storedDates} = this.props;

    return (
      <EventsListPage
        dates={getDates(10, selectedDay, storedDates)}
        onDateChange={dayString => this.setState({selectedDay: dayString})}
        pageTitle="Upcoming Events"
        selectedDay={selectedDay}
        storedDates={storedDates}
      />
    );
  }
}

CalendarUpcoming.propTypes = {
  storedDates: PropTypes.object
};

export default withDatesSubscription(CalendarUpcoming);
