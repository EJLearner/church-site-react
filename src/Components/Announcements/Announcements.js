import React from 'react';

import moment from 'moment';
import _ from 'lodash';

import './Announcements.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

const Announcements = props => {
  const getFormattedDaysEvents = dayEvents => {
    const unsortedAnnouncements = _.filter(dayEvents, {isAnnouncement: true});

    const sortedEvents = unsortedAnnouncements.sort((a, b) => {
      const timeStartA = a.timeStart || '';
      const timeStartB = b.timeStart || '';

      // just doing string compare since standard date-time string is used
      if (timeStartA < timeStartB) {
        return -1;
      }

      if (timeStartA > timeStartB) {
        return 1;
      }

      return 0;
    });

    const renderedEvents = _.map(sortedEvents, event => {
      let timeStart;
      if (event.timeStart) {
        if (event.followsWorship) {
          timeStart = 'Following the morning worship';
        } else {
          timeStart = moment(event.timeStart).format('H:mm a');
        }
      }

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
    const allDates = calendarDatesUtils.getAllDates();
    const datesAsArray = _.map(allDates, (dateObject, dateString) => {
      dateObject.date = dateString;
      return dateObject;
    });

    const sortedDates = _.sortBy(datesAsArray, 'date');

    return _.reduce(
      sortedDates,
      (upComingEvents, dayData) => {
        const {date} = dayData;
        const dateMoment = moment(date);
        if (dateMoment.isSameOrAfter(moment(), 'day')) {
          const events = getFormattedDaysEvents(dayData.events);

          upComingEvents.push({
            date: dateMoment.format('MMMM, D YYYY'),
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
    return renderedEvents.length ? (
      <div className="date" key={date}>
        <h3>{date}</h3>
        {renderedEvents}
      </div>
    ) : null;
  });

  return <div className="announcements-content">{renderedAnnouncements}</div>;
};

export default Announcements;
