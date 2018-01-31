import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import MiniCalendar from './MiniCalendar';

import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

import './EventsListPage.css';

class EventsListPage extends Component {
  getFormattedDate(dateString) {
    return moment(dateString).format('MMM. D, YYYY');
  }

  getSimpleTime(timeString) {
    const momentTime = moment(timeString);

    return momentTime.minutes()
      ? momentTime.format('h:mm a')
      : momentTime.format('h a');
  }

  renderTimeDivs(timeStart, timeEnd, showDate, date) {
    let start = null;
    let end = null;

    if (timeStart) {
      const simpleTimeStart = this.getSimpleTime(timeStart);
      const dateDisplay = showDate ? this.getFormattedDate(date) : '';

      start = (
        <div className="time-start">
          {dateDisplay} at {simpleTimeStart}
        </div>
      );

      if (timeEnd) {
        const simpleTimeEnd = this.getSimpleTime(timeEnd);
        end = <div className="time-end">Until {simpleTimeEnd}</div>;
      }
    }

    return {
      start,
      end
    };
  }

  renderEvents() {
    const dateEvents = [];

    const showDate = this.props.dates.length > 1;

    _.each(this.props.dates, date => {
      const eventsForDate = calendarDatesUtils.getEventsForDate(date);
      const eventsForDateWithDate = eventsForDate.map(event => {
        const clonedEvent = _.cloneDeep(event);
        if (typeof event === 'object') {
          clonedEvent.date = date;
        }

        return clonedEvent;
      });

      dateEvents.push(...eventsForDateWithDate);
    });

    return _.map(dateEvents, (event, index) => {
      if (typeof event === 'object') {
        const {date, timeStart, timeEnd} = event;
        const timeDivs = this.renderTimeDivs(
          timeStart,
          timeEnd,
          showDate,
          date
        );

        return (
          <div className="day-event" key={index}>
            <div className="title">{event.title}</div>
            {timeDivs.start}
            {timeDivs.end}
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
    const {pageTitle, onDateChange, selectedDay, subTitle} = this.props;

    const renderedEvents = this.renderEvents();
    const renderEventsOrNoEvents = renderedEvents.length
      ? renderedEvents
      : 'No Events Listed';

    return (
      <div className="events-list-page">
        <div className="header-and-events">
          <h1>{pageTitle}</h1>
          {subTitle ? <h2>{subTitle}</h2> : null}
          <div className="event-list-container">{renderEventsOrNoEvents}</div>
        </div>
        <div className="mini-calendar-wrapper">
          <MiniCalendar onDateChange={onDateChange} selectedDay={selectedDay} />
        </div>
      </div>
    );
  }
}

EventsListPage.propTypes = {
  dates: PropTypes.array.isRequired,
  onDateChange: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  selectedDay: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

export default EventsListPage;
