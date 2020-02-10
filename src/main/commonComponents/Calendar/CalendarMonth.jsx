import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../../ce/utils/calendarDatesUtils';
import Droplist from '../../../ce/components/Reusable/Droplist/Droplist';
import withDatesSubscription from '../../../ce/components/Hocs/withDatesSubscription';
import styled from 'styled-components';

const MonthCalendarStyle = styled.div`
  background-color: white;

  .controls-and-title {
    background-color: white;
  }
`;

class CalendarMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMoment: moment()
    };

    this.monthBack = this.monthBack.bind(this);
    this.monthForward = this.monthForward.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.renderMonthDropDown = this.renderMonthDropDown.bind(this);
    this.renderYearDropDown = this.renderYearDropDown.bind(this);
  }

  monthForward() {
    const selectedMoment = moment(this.state.selectedMoment).add(1, 'month');
    this.setState({selectedMoment});
  }

  monthBack() {
    const selectedMoment = moment(this.state.selectedMoment).subtract(
      1,
      'month'
    );
    this.setState({selectedMoment});
  }

  onChangeMonth(value) {
    const selectedMoment = this.state.selectedMoment.clone().month(value);
    this.setState({selectedMoment});
  }

  onChangeYear(value) {
    const selectedMoment = this.state.selectedMoment.clone().year(value);
    this.setState({selectedMoment});
  }

  renderTableHeader() {
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

  renderDaysEvents(dateString) {
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

  renderTableBodyRow(weekNumber, year) {
    const renderedDays = _.range(0, 7).map(dayOfWeekIndex => {
      const dayMoment = this.state.selectedMoment
        .clone()
        .year(year)
        .startOf('year')
        .week(weekNumber)
        .startOf('week')
        .add(dayOfWeekIndex, 'day');

      const dayEvents = this.renderDaysEvents(dayMoment.format('YYYY-MM-DD'));

      const isOtherMonth = !dayMoment.isSame(
        this.state.selectedMoment,
        'month'
      );

      const tdClassName = ['date-cell', isOtherMonth && 'other-month']
        .filter(name => name)
        .join(' ');

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

  renderTableBody() {
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
      this.renderTableBodyRow(week, year)
    );

    if (includesNextYear) {
      renderedWeeks.push(this.renderTableBodyRow(1, year + 1));
    }

    return <tbody>{renderedWeeks}</tbody>;
  }

  renderYearDropDown() {
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
        onChange={this.onChangeYear}
        options={options}
        value={this.state.selectedMoment.format('YYYY')}
      />
    );
  }

  renderMonthDropDown() {
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
        onChange={this.onChangeMonth}
        options={options}
        value={selectedMonth}
      />
    );
  }

  render() {
    return (
      <MonthCalendarStyle id="calendar-div">
        <div className="controls-and-title">
          <div className="drop-downs">
            {this.renderYearDropDown()}
            {this.renderMonthDropDown()}
          </div>
          <div className="month-arrows">
            <button onClick={this.monthBack}>
              <i className="fa fa-caret-left fa-lg" title="Previous Month" />
            </button>
            <h2>{this.state.selectedMoment.format('MMMM')}</h2>
            <button onClick={this.monthForward}>
              <i className="fa fa-caret-right fa-lg" title="Next Month" />
            </button>
          </div>
          <div className="empty-space" />
        </div>
        <table className="month-calendar-table">
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </table>
      </MonthCalendarStyle>
    );
  }
}

CalendarMonth.propTypes = {
  storedDates: PropTypes.any
};

export default withDatesSubscription(CalendarMonth);
