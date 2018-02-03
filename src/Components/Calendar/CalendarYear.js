import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';

import moment from 'moment';
import _ from 'lodash';

import MiniCalendar from './MiniCalendar';

import './Calendar.css';

class CalendarYear extends Component {
  constructor(props) {
    super(props);

    this.state = {redirectDate: null};

    this._goToDay = this._goToDay.bind(this);
    this._renderMonths = this._renderMonths.bind(this);
  }

  _goToDay(dayString, hasEvents) {
    this.setState({redirectDate: dayString});
  }

  _getMiniCalendarMonths() {
    return _.range(0, 12).map(monthsAdded => {
      return moment(this.props.firstMonth)
        .add(monthsAdded, 'months')
        .format('YYYY-MM-DD');
    });
  }

  _renderMonths() {
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

  _redirect() {
    return (
      <Redirect
        push
        to={{
          pathname: `/calendar/day`,
          state: {selectedDay: this.state.redirectDate}
        }}
      />
    );
  }

  render() {
    if (this.state.redirectDate) {
      return this._redirect();
    }

    return (
      <div className="year-calendar-content">
        <h2>Events This Year</h2>
        <div className="year-calendar-months-display">
          {this._renderMonths()}
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
