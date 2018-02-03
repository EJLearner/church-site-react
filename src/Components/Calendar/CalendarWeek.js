import React, {Component} from 'react';

import moment from 'moment';
import _ from 'lodash';

import EventsListPage from './EventsListPage';

import './Calendar.css';

class CalendarWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};

    this._renderSubTitleString = this._renderSubTitleString.bind(this);
    this._getDates = this._getDates.bind(this);
  }

  _renderSubTitleString() {
    const {selectedDay} = this.state;
    const dayFormat = 'dddd, MMMM D, YYYY';

    const firstDay = moment(selectedDay)
      .startOf('week')
      .format(dayFormat);

    const lastDay = moment(selectedDay)
      .endOf('week')
      .format(dayFormat);

    return `${firstDay} - ${lastDay}`;
  }

  _getDates() {
    const firstDay = moment(this.state.selectedDay).startOf('week');

    const dates = _.range(0, 7).map(daysAdded => {
      return moment(firstDay)
        .add(daysAdded, 'days')
        .format('YYYY-MM-DD');
    });

    return dates;
  }

  render() {
    return (
      <EventsListPage
        dates={this._getDates()}
        highlightWeek
        pageTitle="Events This Week"
        selectedDay={this.state.selectedDay}
        subTitle={this._renderSubTitleString()}
      />
    );
  }
}

export default CalendarWeek;
