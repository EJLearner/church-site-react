import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import commonUtils from '../../../utils/commonUtils';
import calendarDatesUtils from '../../utils/calendarDatesUtils';
import withDatesSubscription from '../Hocs/withDatesSubscription';

import './MiniCalendar.css';
const CONTROLS = {
  PREV: 'PREV',
  NEXT: 'NEXT'
};

class DeprecatedMiniCalendar extends Component {
  constructor(props) {
    super(props);

    this.onClickCell = this.onClickCell.bind(this);
    this.addMonth = this.addMonth.bind(this);
  }

  addMonth(monthsToAdd) {
    if (this.props.onDateChange) {
      const newDate = moment(this.props.selectedDay)
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');

      this.props.onDateChange(newDate);
    }
  }

  onClickCell(dayString, daysEventsCount) {
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

  renderTableHeader() {
    const headerCells = commonUtils.range(0, 7).map((dayOfWeekIndex) => {
      const stringDayOfWeek = moment().weekday(dayOfWeekIndex).format('dd');

      return <th key={stringDayOfWeek}>{stringDayOfWeek}</th>;
    });

    return (
      <thead>
        <tr>{headerCells}</tr>
      </thead>
    );
  }

  renderTableBodyRow(weekNumber, year) {
    const {
      allDatesClickable,
      highlightSelectedDay,
      highlightWeek,
      selectedDay
    } = this.props;

    const renderedDays = commonUtils.range(0, 7).map((dayOfWeekIndex) => {
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
        .filter((text) => text)
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
          onClick={() => this.onClickCell(dayString, daysEventsCount)}
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

    const weekNumbers = commonUtils.range(
      firstWeekOfMonth,
      lastWeekOfMonthInSameYear + 1
    );

    const year = todayMoment.year();

    const renderedWeeks = weekNumbers.map((week) => {
      return this.renderTableBodyRow(week, year);
    });

    if (includesNextYear) {
      renderedWeeks.push(this.renderTableBodyRow(1, year + 1));
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
          onClick={() => this.addMonth(addition)}
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
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </table>
      </div>
    );
  }
}

DeprecatedMiniCalendar.propTypes = {
  allDatesClickable: PropTypes.bool,
  highlightSelectedDay: PropTypes.bool,
  highlightWeek: PropTypes.bool,
  onDateChange: PropTypes.func,
  onDateClick: PropTypes.func,
  selectedDay: PropTypes.string,
  storedDates: PropTypes.object,
  yearDisplayMode: PropTypes.bool
};

DeprecatedMiniCalendar.defaultProps = {
  allDatesClickable: true,
  highlightWeek: false,
  highlightSelectedDay: true,
  yearDisplayMode: false
};

export default withDatesSubscription(DeprecatedMiniCalendar);
