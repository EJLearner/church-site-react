import React from 'react';

import _ from 'lodash';
import moment from 'moment';

const dates = [
  {
    date: '2017-07-10',
    events: [{title: 'Vacation Bible School Start'}]
  },
  {
    date: '2017-07-14',
    events: ['Vacation Bible School End and Closing Ceremony']
  },
  {
    date: '2017-08-27',
    events: [
      {
        timeStart: '2017-08-27T08:00:00',
        timeEnd: '2017-08-27T10:00:00',
        title: 'Outreach Benefit Concert',
        description:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  },
  {
    date: '2018-01-05',
    events: [
      {
        title: 'Outreach Benefit Concert',
        description:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  }
];

const calendarDatesUtils = {
  getEventsForDate: dateString => {
    const dateObject = dates.find(date => date.date === dateString);
    return dateObject && dateObject.events;
  },

  getRenderedEventsForDateMonthView: dateString => {
    const dayEvents = calendarDatesUtils.getEventsForDate(dateString);

    return _.map(dayEvents, (event, index, allEvents) => {
      const title = event.title || event;

      return (
        <div>
          <span key={index}>{title}</span>
          {event === _.last(allEvents) ? null : <hr />}
        </div>
      );
    });
  },

  getAnnouncements: quantity => {
    return _.map(dates, date => {
      const events = _.map(date.events, event => {
        const timeStart = event.timeStart
          ? moment(event.timeStart).format('H:mm a')
          : undefined;
        const timeEnd = event.timeEnd
          ? moment(event.timeEnd).format('H:mm a')
          : undefined;
        return {
          description: event.description,
          timeStart,
          timeEnd,
          title: event.title || event
        };
      });

      return {
        date: moment(date.date).format('MMMM, D YYYY'),
        events
      };
    });
  }
};

export default calendarDatesUtils;
