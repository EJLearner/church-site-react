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
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'day');

      const hasDayEvents = calendarDatesUtils.getEventsForDate(
        dayMoment.format('YYYY-MM-DD')
      ).length;

      const isOtherMonth = !dayMoment.isSame(this.props.selectedDay, 'month');

      const tdClassName = classNames('date-cell', {
        'other-month': isOtherMonth,
        'has-events': hasDayEvents
      });

      return (
        <td
          className={tdClassName}
          key={dayOfWeekIndex}
          title={dayMoment.format('LL')}
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

    const weekNumbers = _.range(firstWeekOfMonth, lastWeekOfMonth + 1);
    const renderedWeeks = weekNumbers.map(week =>
      this._renderTableBodyRow(week)
    );

    return <tbody>{renderedWeeks}</tbody>;
  }

  render() {
    return (
      <div className="mini-calendar">
        MiniCalendar Selected day = {this.props.selectedDay}{' '}
        <table>
          {this._renderTableHeader()}
          {this._renderTableBody()}
        </table>
      </div>
    );
  }
}

MiniCalendar.propTypes = {
  selectedDay: PropTypes.string
};

export default MiniCalendar;
