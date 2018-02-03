import React from 'react';

import moment from 'moment';
import _ from 'lodash';

import './Announcements.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

const Announcements = props => {
  const getFormattedDaysEvents = dayData => {
    const unSortedEvents = _.map(dayData.events, event => {
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

    const sortedEvents = unSortedEvents;

    return sortedEvents;
  };

  const getFormattedAnnouncements = quantity => {
    return _.reduce(
      calendarDatesUtils.getAllDates(),
      (upComingEvents, dayData, dateString) => {
        if (moment(dateString).isSameOrAfter(moment(), 'day')) {
          const events = getFormattedDaysEvents(dayData);

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
