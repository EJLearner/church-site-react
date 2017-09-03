import React, {Component} from 'react';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../Data/calendarDatesUtils.js';

import './Calendar.css';

class Calendar
 extends Component {
   constructor(props) {
     super(props);
     this.state = {
       currentMonth: moment()
     }

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

  _getTableHeader(){
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const headerCells = days.map((day) => {
      return (
        <th key={day}>
          {day}
        </th>
      );
    });

    return(
      <thead><tr>
        {headerCells}
      </tr></thead>
    );
  }

  _renderTableBodyRow(weekNumber, year){
    const renderedDays = _.range(0, 7).map((cell) => {
      const dayMoment = moment().week(weekNumber).startOf('week').add(cell, 'day');
      const dayEvents = calendarDatesUtils.getRenderedEventsForDate(dayMoment.format('YYYY-MM-DD'));
      return(
        <td className='date-cell'
          key={cell}
          title={dayMoment.format('LL')}
          style={{width: '150px', height: '150px'}}
        >
          <div>
            <div className='date-area'>
              {dayMoment.date()}
            </div>
            <div className='events-area'>
              {dayEvents}
            </div>
          </div>
        </td>
      );
    })

    return(
      <tr key={weekNumber}>
        {renderedDays}
      </tr>
    );
  }

  _renderTableBody(){
    const todayMoment = this.state.currentMonth;
    const firstWeekOfMonth = todayMoment.startOf('month').week();
    const lastWeekOfMonth = todayMoment.endOf('month').week();

    const weekNumbers = _.range(firstWeekOfMonth, lastWeekOfMonth + 1);
    const renderedWeeks = weekNumbers.map(week => this._renderTableBodyRow(week));

    return(
      <tbody>
        {renderedWeeks}
      </tbody>
    );
  }

  render() {
    return (

      <div id='calendar-div'>
        <div className="controls-and-title">
          <a onClick={this._monthBack}><i className="fa fa-caret-left fa-lg" title="Previous Month"/></a>
          <h2>{this.state.currentMonth.format('MMMM YYYY')}</h2>
          <a onClick={this._monthForward}><i className="fa fa-caret-right fa-lg" title="Next Month"/></a>
        </div>
        <table id='calendar-table'>
          {this._getTableHeader()}
          {this._renderTableBody()}
        </table>
      </div>
    );
  }
}

export default Calendar;
