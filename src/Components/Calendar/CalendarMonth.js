import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import Droplist from '../Reusable/Droplist/Droplist';
import withDatesSubscription from '../Hocs/withDatesSubscription';

import calendarDatesUtils from '../../utils/calendarDatesUtils.js';
import classNames from 'classnames';

import './Calendar.css';

class CalendarMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMoment: moment()
    };

    this._monthBack = this._monthBack.bind(this);
    this._monthForward = this._monthForward.bind(this);
    this._onChangeMonth = this._onChangeMonth.bind(this);
    this._onChangeYear = this._onChangeYear.bind(this);
    this._renderMonthDropDown = this._renderMonthDropDown.bind(this);
    this._renderYearDropDown = this._renderYearDropDown.bind(this);
  }

  _monthForward() {
    const selectedMoment = moment(this.state.selectedMoment).add(1, 'month');
    this.setState({selectedMoment});
  }

  _monthBack() {
    const selectedMoment = moment(this.state.selectedMoment).subtract(
      1,
      'month'
    );
    this.setState({selectedMoment});
  }

  _onChangeMonth(value) {
    const selectedMoment = this.state.selectedMoment.clone().month(value);
    this.setState({selectedMoment});
  }

  _onChangeYear(value) {
    const selectedMoment = this.state.selectedMoment.clone().year(value);
    this.setState({selectedMoment});
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

  _renderDaysEvents(dateString) {
    const daysEventsData = calendarDatesUtils.getEventsForDate(
      this.props.storedDates,
      dateString
    );

    return _.map(daysEventsData, (event, index, allEvents) => {
      const title = event.title || event;

      return (
        <div key={index}>
          <span>{title}</span>
          {event === _.last(allEvents) ? null : <hr />}
        </div>
      );
    });
  }

  _renderTableBodyRow(weekNumber, year) {
    const renderedDays = _.range(0, 7).map(dayOfWeekIndex => {
      const dayMoment = this.state.selectedMoment
        .clone()
        .year(year)
        .startOf('year')
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'day');

      const dayEvents = this._renderDaysEvents(dayMoment.format('YYYY-MM-DD'));

      const isOtherMonth = !dayMoment.isSame(
        this.state.selectedMoment,
        'month'
      );

      const tdClassName = classNames('date-cell', {
        'other-month': isOtherMonth
      });

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
    const todayMoment = this.state.selectedMoment;
    const firstWeekOfMonth = todayMoment.startOf('month').week();
    const lastWeekOfMonth = todayMoment.endOf('month').week();
    const includesNextYear = lastWeekOfMonth === 1;

    let lastWeekOfMonthInSameYear = lastWeekOfMonth;
    if (includesNextYear) {
      lastWeekOfMonthInSameYear = todayMoment
        .endOf('month')
        .subtract(1, 'weeks')
        .week();
    }

    const weekNumbers = _.range(
      firstWeekOfMonth,
      lastWeekOfMonthInSameYear + 1
    );

    const year = todayMoment.year();
    const renderedWeeks = weekNumbers.map(week =>
      this._renderTableBodyRow(week, year)
    );

    if (includesNextYear) {
      renderedWeeks.push(this._renderTableBodyRow(1, year + 1));
    }

    return <tbody>{renderedWeeks}</tbody>;
  }

  _renderYearDropDown() {
    // make these props
    const currentYear = moment().year();
    const options = _.range(currentYear - 1, currentYear + 4).map(year => {
      const stringYear = String(year);
      return {
        label: stringYear,
        value: stringYear
      };
    });

    return (
      <Droplist
        onChange={this._onChangeYear}
        options={options}
        value={this.state.selectedMoment.format('YYYY')}
      />
    );
  }

  _renderMonthDropDown() {
    const selectedMonth = this.state.selectedMoment.format('MMM').toLowerCase();

    const options = _.range(0, 12).map(monthNum => {
      const momentMonth = moment().month(monthNum);
      return {
        label: momentMonth.format('MMMM'),
        value: momentMonth.format('MMM').toLowerCase()
      };
    });

    return (
      <Droplist
        onChange={this._onChangeMonth}
        options={options}
        value={selectedMonth}
      />
    );
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
            <h2>{this.state.selectedMoment.format('MMMM')}</h2>
            <a onClick={this._monthForward}>
              <i className="fa fa-caret-right fa-lg" title="Next Month" />
            </a>
          </div>
          <div className="empty-space" />
        </div>
        <table className="month-calendar-table">
          {this._renderTableHeader()}
          {this._renderTableBody()}
        </table>
      </div>
    );
  }
}

CalendarMonth.propTypes = {
  storedDates: PropTypes.any
};

export default withDatesSubscription(CalendarMonth);
