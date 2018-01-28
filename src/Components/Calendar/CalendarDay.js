import React, {Component} from 'react';

import moment from 'moment';

import EventsListPage from './EventsListPage';

class CalendarDay extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};
  }

  render() {
    return (
      <EventsListPage
        dates={[this.state.selectedDay]}
        pageTitle="Today’s Events"
        selectedDay={this.state.selectedDay}
      />
    );
  }
}

export default CalendarDay;
