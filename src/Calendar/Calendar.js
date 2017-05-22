import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';


class Calendar
 extends Component {

  getEvents(dayMoment) {
    const dayMomentYear = dayMoment.format('YYYY');
    const dayMomentMonth = dayMoment.format('MMM');
    const dayMomentDate = dayMoment.format('DD');
    const events = {
      '2017': {
        'May': {
          '25': 'Pumpkin chucking',
          '29': 'Test  dummy day',
          '05': 'Subpar golfing'
        }
      }
    };

    return(_.get(events, `[${dayMomentYear}][${dayMomentMonth}][${dayMomentDate}]`));
  }

  getTableHeader(){
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

  renderTableBodyRow(weekNumber, year){
    const renderedDays = _.range(0, 7).map((cell) => {
      const dayMoment = moment().week(weekNumber).add(cell, 'day');
      const dayEvents = this.getEvents(dayMoment);
      console.log(dayEvents);
      return(
        <td
          key={cell}
          title={dayMoment.format('LL')}
        >
          <div>
            {dayMoment.date()}
          </div>
          <div>
            {dayEvents}
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

  renderTableBody(){
    const today = '2017-05-21';
    const todayMoment = moment(today);
    const firstWeekOfMonth = todayMoment.startOf('month').week();
    const lastWeekOfMonth = todayMoment.endOf('month').week();

    const weekNumbers = _.range(firstWeekOfMonth, lastWeekOfMonth + 1);
    const renderedWeeks = weekNumbers.map(week => this.renderTableBodyRow(week));

    return(
      <tbody>
        {renderedWeeks}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <table>
          {this.getTableHeader()}
          {this.renderTableBody()}
        </table>
      </div>
    );
  }
}

export default Calendar;
