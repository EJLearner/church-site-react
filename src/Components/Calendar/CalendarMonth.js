import React, {Component} from 'react';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../utils/calendarDatesUtils.js';
import classNames from '../../utils/classNames';

import './Calendar.css';

class CalendarMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment()
    };

    this._monthBack = this._monthBack.bind(this);
    this._monthForward = this._monthForward.bind(this);
  }

  _monthForward() {
    const currentMonth = moment(this.state.currentMonth).add(1, 'month');
    this.setState({currentMonth});
  }

  _monthBack() {
    const currentMonth = moment(this.state.currentMonth).subtract(1, 'month');
    this.setState({currentMonth});
  }

  _renderTableHeader() {
    const headerCells = _.range(0, 7).map(dayOfWeekIndex => {
      const stringDayOfWeek = moment()
        .weekday(dayOfWeekIndex)
        .format('dddd');

      return <th key={stringDayOfWeek}>{stringDayOfWeek}</th>;
    });

    return (
      <thead>
        <tr>{headerCells}</tr>
      </thead>
    );
  }

  _renderTableBodyRow(weekNumber, year) {
    const renderedDays = _.range(0, 7).map(dayOfWeekIndex => {
      const dayMoment = moment()
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'day');

      const dayEvents = calendarDatesUtils.getRenderedEventsForDate(
        dayMoment.format('YYYY-MM-DD')
      );

      const isOtherMonth = !dayMoment.isSame(this.state.currentMonth, 'month');

      const tdClassName = classNames(
        'date-cell',
        isOtherMonth && 'other-month'
      );

      return (
        <td
          className={tdClassName}
          key={dayOfWeekIndex}
          title={dayMoment.format('LL')}
        >
          <div>
            <div className="date-area">{dayMoment.date()}</div>
            <div className="events-area">{dayEvents}</div>
          </div>
        </td>
      );
    });

    return <tr key={weekNumber}>{renderedDays}</tr>;
  }

  _renderTableBody() {
    const todayMoment = this.state.currentMonth;
    const firstWeekOfMonth = todayMoment.startOf('month').week();
    const lastWeekOfMonth = todayMoment.endOf('month').week();

    const weekNumbers = _.range(firstWeekOfMonth, lastWeekOfMonth + 1);
    const renderedWeeks = weekNumbers.map(week =>
      this._renderTableBodyRow(week)
    );

    return <tbody>{renderedWeeks}</tbody>;
  }

  _renderYearDropDown() {
    return 'year dropdown';
  }

  _renderMonthDropDown() {
    return 'year dropdown';
  }

  render() {
    return (
      <div id="calendar-div">
        <div className="controls-and-title">
          <div className="drop-downs">
            {this._renderYearDropDown()}
            {this._renderMonthDropDown()}
          </div>
          <div className="month-arrows">
            <a onClick={this._monthBack}>
              <i className="fa fa-caret-left fa-lg" title="Previous Month" />
            </a>
            <h2>{this.state.currentMonth.format('MMMM')}</h2>
            <a onClick={this._monthForward}>
              <i className="fa fa-caret-right fa-lg" title="Next Month" />
            </a>
          </div>
          <div className="empty-space" />
        </div>
        <table id="calendar-table">
          {this._renderTableHeader()}
          {this._renderTableBody()}
        </table>
      </div>
    );
  }
}

export default CalendarMonth;
