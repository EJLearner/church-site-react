import React, {Component} from 'react';

import moment from 'moment';

import EventsListPage from './EventsListPage';

class CalendarDay extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};

    this._onDateChange = this._onDateChange.bind(this);
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

export default CalendarDay;
