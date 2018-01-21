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

    console.log(dayEvents);

    return _.map(dayEvents, (event, index) => {
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
    const renderedEvents = this.renderEvents();
    const renderEventsOrNoEvents = renderedEvents.length
      ? renderedEvents
      : 'No Events Today';

    return (
      <div>
        <h1>Today’s Events</h1>
        <div className="event-list-container">{renderEventsOrNoEvents}</div>
      </div>
    );
  }
}

export default CalendarDay;
