import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../utils/calendarDatesUtils';
import classNames from 'classnames';

import './MiniCalendar.css';

class MiniCalendar extends Component {
  constructor(props) {
    super(props);

    this._onClickCell = this._onClickCell.bind(this);
    this._addMonth = this._addMonth.bind(this);
  }

  _addMonth(monthsToAdd) {
    if (this.props.onDateChange) {
      const newDate = moment(this.props.selectedDay)
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');

      this.props.onDateChange(newDate);
    }
  }

  _onClickCell(dayString) {
    if (this.props.onDateChange) {
      this.props.onDateChange(dayString);
    }
  }

  _renderTableHeader() {
    const headerCells = _.range(0, 7).map(dayOfWeekIndex => {
      const stringDayOfWeek = moment()
        .weekday(dayOfWeekIndex)
        .format('dd');

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
      const dayMoment = moment(this.props.selectedDay)
        .year(year)
        .startOf('year')
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'days');

      const dayString = dayMoment.format('YYYY-MM-DD');

      const hasDayEventsCount = calendarDatesUtils.getEventsForDate(dayString)
        .length;

      const isOtherMonth = !dayMoment.isSame(this.props.selectedDay, 'month');
      const isSelectedDay = dayMoment.isSame(this.props.selectedDay, 'day');

      const tdClassName = classNames('date-cell', {
        'has-events': hasDayEventsCount,
        'other-month': isOtherMonth,
        'selected-day': isSelectedDay
      });

      const daysEventCount = hasDayEventsCount
        ? ` ${hasDayEventsCount} events this day. Click for more info`
        : '';

      return (
        <td
          className={tdClassName}
          key={dayOfWeekIndex}
          onClick={_.partial(this._onClickCell, dayString)}
          title={dayMoment.format('LL') + daysEventCount}
        >
          {dayMoment.date()}
        </td>
      );
    });

    return <tr key={weekNumber}>{renderedDays}</tr>;
  }

  _renderTableBody() {
    const todayMoment = moment(this.props.selectedDay);
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

    const renderedWeeks = weekNumbers.map(week => {
      return this._renderTableBodyRow(week, year);
    });

    if (includesNextYear) {
      renderedWeeks.push(this._renderTableBodyRow(1, year + 1));
    }

    return <tbody>{renderedWeeks}</tbody>;
  }

  render() {
    return (
      <div className="mini-calendar">
        <div className="controls-and-month-name">
          <i
            className="fa fa-angle-double-left"
            onClick={_.partial(this._addMonth, -1)}
            tabIndex="0"
          />
          {moment(this.props.selectedDay).format('MMMM YYYY')}
          <i
            className="fa fa-angle-double-right"
            onClick={_.partial(this._addMonth, 1)}
            tabIndex="0"
          />
        </div>
        <table>
          {this._renderTableHeader()}
          {this._renderTableBody()}
        </table>
      </div>
    );
  }
}

MiniCalendar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  selectedDay: PropTypes.string
};

export default MiniCalendar;
