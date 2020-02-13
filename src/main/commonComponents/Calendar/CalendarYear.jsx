import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';

import routePaths from '../../../routePaths';

import moment from 'moment';
import _ from 'lodash';

import MiniCalendar from './MiniCalendar';

function getMiniCalendarMonths(firstMonth) {
  return _.range(0, 12).map(monthsAdded => {
    return moment(firstMonth)
      .add(monthsAdded, 'months')
      .format('YYYY-MM-DD');
  });
}

class CalendarYear extends Component {
  constructor(props) {
    super(props);

    this.state = {redirectDate: null};
  }

  renderMonths() {
    return getMiniCalendarMonths(this.props.firstMonth).map(monthDate => {
      let selectedDay = monthDate;
      let highlightSelectedDay = false;

      if (moment(monthDate).isSame(moment(), 'month')) {
        selectedDay = moment().format('YYYY-MM-DD');
        highlightSelectedDay = true;
      }

      return (
        <div className="yearly-calendar-month-wrapper" key={selectedDay}>
          <MiniCalendar
            allDatesClickable
            highlightSelectedDay={highlightSelectedDay}
            onDateClick={dayString => this.setState({redirectDate: dayString})}
            selectedDay={selectedDay}
            yearDisplayMode
          />
        </div>
      );
    });
  }

  redirect() {
    return (
      <Redirect
        push
        to={{
          pathname: routePaths.MAIN_CALENDAR_DAY,
          state: {selectedDay: this.state.redirectDate}
        }}
      />
    );
  }

  render() {
    if (this.state.redirectDate) {
      return this.redirect();
    }

    return (
      <div className="year-calendar-content">
        <h2>Events This Year</h2>
        <div className="year-calendar-months-display">
          {this.renderMonths()}
        </div>
      </div>
    );
  }
}

CalendarYear.propTypes = {
  firstMonth: PropTypes.string
};

CalendarYear.defaultProps = {
  firstMonth: moment().format('YYYY-MM-DD')
};

export default CalendarYear;
