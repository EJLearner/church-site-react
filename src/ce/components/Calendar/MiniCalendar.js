import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../utils/calendarDatesUtils';

import './MiniCalendar.css';
import withDatesSubscription from '../Hocs/withDatesSubscription';

const CONTROLS = {
  PREV: 'PREV',
  NEXT: 'NEXT'
};

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

  _onClickCell(dayString, daysEventsCount) {
    if (this.props.onDateChange) {
      this.props.onDateChange(dayString, daysEventsCount);
    }

    if (
      this.props.onDateClick &&
      (daysEventsCount || this.props.allDatesClickable)
    ) {
      this.props.onDateClick(dayString, daysEventsCount);
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
    const {
      allDatesClickable,
      highlightSelectedDay,
      highlightWeek,
      selectedDay
    } = this.props;

    const renderedDays = _.range(0, 7).map(dayOfWeekIndex => {
      const dayMoment = moment(selectedDay)
        .year(year)
        .startOf('year')
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'days');

      const dayString = dayMoment.format('YYYY-MM-DD');

      const daysEventsCount = calendarDatesUtils.getEventsForDate(
        this.props.storedDates,
        dayString
      ).length;

      const isOtherMonth = !dayMoment.isSame(selectedDay, 'month');
      const isSelectedDay = dayMoment.isSame(selectedDay, 'day');
      const isSelectedWeek = dayMoment.isSame(selectedDay, 'week');

      const tdClassName = [
        'date-cell',
        daysEventsCount && 'has-events',
        (daysEventsCount || allDatesClickable) && 'clickable',
        isOtherMonth && 'other-month',
        highlightSelectedDay &&
          !highlightWeek &&
          isSelectedDay &&
          'selected-day',
        highlightWeek && isSelectedWeek && 'selected-week'
      ]
        .filter(text => text)
        .join(' ');

      let daysEventsMessage = '';
      if (daysEventsCount) {
        const eventOrEventsString = daysEventsCount > 1 ? 'events' : 'event';

        daysEventsMessage = ` ${daysEventsCount} ${eventOrEventsString} this day. Click for more info`;
      }

      return (
        <td
          className={tdClassName}
          key={dayOfWeekIndex}
          onClick={_.partial(this._onClickCell, dayString, daysEventsCount)}
          title={dayMoment.format('LL') + daysEventsMessage}
        >
          <div>{dayMoment.date()}</div>
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

  renderControls(control) {
    if (!this.props.yearDisplayMode) {
      const isPrev = control === CONTROLS.PREV;
      const direction = isPrev ? 'left' : 'right';
      const addition = isPrev ? -1 : 1;

      return (
        <i
          className={`fa fa-angle-double-${direction}`}
          onClick={_.partial(this._addMonth, addition)}
          tabIndex="0"
        />
      );
    }
  }

  render() {
    let monthNameClassName = 'controls-and-month-name';

    if (this.props.yearDisplayMode) {
      monthNameClassName += ' no-controls';
    }

    return (
      <div className="mini-calendar">
        <div className={monthNameClassName}>
          {this.renderControls(CONTROLS.PREV)}
          {moment(this.props.selectedDay).format('MMMM YYYY')}
          {this.renderControls(CONTROLS.NEXT)}
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
  allDatesClickable: PropTypes.bool,
  highlightSelectedDay: PropTypes.bool,
  highlightWeek: PropTypes.bool,
  onDateChange: PropTypes.func,
  onDateClick: PropTypes.func,
  selectedDay: PropTypes.string,
  storedDates: PropTypes.any,
  yearDisplayMode: PropTypes.bool
};

MiniCalendar.defaultProps = {
  allDatesClickable: true,
  highlightWeek: false,
  highlightSelectedDay: true,
  yearDisplayMode: false
};

export default withDatesSubscription(MiniCalendar);
