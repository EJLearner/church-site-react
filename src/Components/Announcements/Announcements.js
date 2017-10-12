import React from 'react';

import './Announcements.css';
import calendarDatesUtils from '../../utils/calendarDatesUtils.js';

const Announcements = props => {
  const renderedAnnouncments = calendarDatesUtils
    .getAnnouncements()
    .map(dayData => {
      const {date} = dayData;
      const renderedEvents = dayData.events.map(event => {
        const {timeEnd, timeStart, title, description} = event;
        const timeEndString = timeStart && timeEnd ? ` - ${timeEnd}` : '';

        return (
          <div className="event" key={`${date}-${title}`}>
            <div>
              {timeStart}
              {timeEndString}
            </div>
            <div>{title}</div>
            <div>{description}</div>
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

  return <div className="announcements-content">{renderedAnnouncments}</div>;
};

export default Announcements;
