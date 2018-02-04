import React from 'react';

import moment from 'moment';
import _ from 'lodash';

import './Announcements.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

const Announcements = props => {
  const getFormattedDaysEvents = unsortedEvents => {
    const sortedEvents = unsortedEvents.sort((a, b) => {
      const timeStartA = typeof a === 'object' ? a.timeStart : undefined;
      const momentA = timeStartA ? moment(timeStartA) : moment.unix(0);

      const timeStartB = typeof b === 'object' ? b.timeStart : undefined;
      const momentB = timeStartB ? moment(timeStartB) : moment.unix(0);

      if (momentA.isBefore(momentB)) {
        return -1;
      } else if (momentA.isAfter(momentB)) {
        return 1;
      }

      return 0;
    });

    const renderedEvents = _.map(sortedEvents, event => {
      const timeStart = event.timeStart
        ? moment(event.timeStart).format('H:mm a')
        : undefined;
      const timeEnd = event.timeEnd
        ? moment(event.timeEnd).format('H:mm a')
        : undefined;

      return {
        shortDescription: event.shortDescription,
        timeStart,
        timeEnd,
        title: event.title || event
      };
    });

    return renderedEvents;
  };

  const getFormattedAnnouncements = quantity => {
    return _.reduce(
      calendarDatesUtils.getAllDates(),
      (upComingEvents, dayData, dateString) => {
        if (moment(dateString).isSameOrAfter(moment(), 'day')) {
          const events = getFormattedDaysEvents(dayData.events);

          upComingEvents.push({
            date: moment(dateString).format('MMMM, D YYYY'),
            events
          });
        }

        return upComingEvents;
      },
      []
    );
  };

  const renderedAnnouncements = getFormattedAnnouncements().map(dayData => {
    const {date} = dayData;
    const renderedEvents = dayData.events.map(event => {
      const {timeEnd, timeStart, title, shortDescription} = event;
      const timeEndString = timeStart && timeEnd ? ` - ${timeEnd}` : '';

      return (
        <div className="event" key={`${date}-${title}`}>
          <div>
            {timeStart}
            {timeEndString}
          </div>
          <div>{title}</div>
          <div>{shortDescription}</div>
        </div>
      );
    });
    return (
      <div className="date" key={date}>
        <h3>{date}</h3>
        {renderedEvents}
      </div>
    );
  });

  return <div className="announcements-content">{renderedAnnouncements}</div>;
};

export default Announcements;
