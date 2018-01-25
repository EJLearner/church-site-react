import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'lodash';

import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

import './EventsListPage.css';

const types = {
  DAYVIEW: 'DAYVIEW'
};

class EventsListPage extends Component {
  constructor(props) {
    super(props);
  }

  renderTimeStartAndEndLines(timeStart, timeEnd) {}

  renderEvents() {
    const dateEvents = [];

    _.each(this.props.dates, date => {
      dateEvents.push(...calendarDatesUtils.getEventsForDate(date));
    });

    return _.map(dateEvents, (event, index) => {
      if (typeof event === 'object') {
        const {timeStart, timeEnd} = event;
        let timeStartDiv = null;
        let timeEndDiv = null;

        if (timeStart) {
          const momentStart = moment(timeStart);
          const simpleTimeStart = momentStart.minutes()
            ? momentStart.format('h:mm a')
            : momentStart.format('h a');

          timeStartDiv = <div className="time-start">at {simpleTimeStart}</div>;

          if (timeEnd) {
            const momentEnd = moment(timeEnd);
            const simpleTimeEnd = momentEnd.minutes()
              ? momentEnd.format('h:mm a')
              : momentEnd.format('h a');

            timeEndDiv = <div className="time-end">Until {simpleTimeEnd}</div>;
          }
        }

        return (
          <div className="day-event" key={index}>
            <div className="title">{event.title}</div>
            {timeStartDiv}
            {timeEndDiv}
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
      <div className="events-list-page">
        <h1>{this.props.pageTitle}</h1>
        <div className="event-list-container">{renderEventsOrNoEvents}</div>
      </div>
    );
  }
}

EventsListPage.propTypes = {
  dates: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf(types).isRequired
};

EventsListPage.types = types;

export default EventsListPage;
