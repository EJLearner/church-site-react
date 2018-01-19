import React, {Component} from 'react';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

import './CalendarDay.css';

class CalendarDay extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDay: moment().format('YYYY-MM-DD')};
  }

  renderEvents() {
    const dayEvents = calendarDatesUtils.getEventsForDate(
      this.state.selectedDay
    );

    return dayEvents.map((event, index) => {
      if (typeof event === 'object') {
        const {timeStart, timeEnd} = event;
        let simpleTime = '';

        if (timeStart) {
          const momentStart = moment(timeStart);
          const simpleTimeStart = momentStart.minutes()
            ? momentStart.format('h:mm a')
            : momentStart.format('h a');

          if (timeEnd) {
            const momentEnd = moment(timeEnd);
            const simpleTimeEnd = momentEnd.minutes()
              ? momentEnd.format('h:mm a')
              : momentEnd.format('h a');

            simpleTime = `from ${simpleTimeStart} to ${simpleTimeEnd}`;
          } else {
            simpleTime = `at ${simpleTimeStart}`;
          }
        }

        return (
          <div className="day-event" key={index}>
            <div className="title">{event.title}</div>
            <div className="time">{simpleTime}</div>
            <div className="location">{event.location}</div>
            <div className="blurb">{event.blurb}</div>
          </div>
        );
      }

      return (
        <div className="day-event" key={index}>
          <div className="title">{event}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Today’s Events</h1>
        {this.renderEvents()}
      </div>
    );
  }
}

export default CalendarDay;
