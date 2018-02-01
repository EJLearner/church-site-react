import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import MiniCalendar from './MiniCalendar';

import './Calendar.css';

class CalendarYear extends Component {
  _goToDay(dayString, hasEvents) {
    console.log(`going to the date ${dayString}`);
  }

  _getMiniCalendarMonths() {
    return _.range(0, 12).map(monthsAdded => {
      return moment(this.props.firstMonth)
        .add(monthsAdded, 'months')
        .format('YYYY-MM-DD');
    });
  }

  render() {
    return this._getMiniCalendarMonths().map(monthDate => (
      <div className="yearly-calendar-month-wrapper" key={monthDate}>
        <MiniCalendar
          allDatesClickable
          onDateClick={this._goToDay}
          selectedDay={monthDate}
          yearDisplayMode
        />
      </div>
    ));
  }
}

CalendarYear.propTypes = {
  firstMonth: PropTypes.string
};

CalendarYear.defaultProps = {
  firstMonth: moment().format('YYYY-MM-DD')
};

export default CalendarYear;
