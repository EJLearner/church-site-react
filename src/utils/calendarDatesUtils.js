import React from 'react';

import _ from 'lodash';
import moment from 'moment';

const dates = {
  '2017-07-10': {
    events: [{title: 'Vacation Bible School Start'}]
  },
  '2017-07-14': {
    events: ['Vacation Bible School End and Closing Ceremony']
  },
  '2017-08-27': {
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
  '2018-01-05': {
    events: [
      {
        title: 'Outreach Benefit Concert',
        description:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  },
  '2018-01-18': {
    events: [
      {
        blurb:
          'The Women’s Ministry invites you to kick-off your yuletide celebrations early! Join us in our Winter Wonderland. There will be delectable Christmas snacks, activities, food, and maybe a visit from Santa himself. Don’t forget your $10 wrapped Christmas gift for our White Elephant game! All of this and more is planned in honor of this blessed season. R.S.V.P. for your family with any member of the Women’s Ministry. If you would like to contribute to this event, please see Min. Patricia Yeargin or Sis. Phyllis Day.',
        description:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!',
        title: 'Outreach Benefit Concert',
        timeStart: '2018-01-18T08:00:00',
        timeEnd: '2017-01-18T10:00:00',
        location: 'Undercroft'
      },
      'Event two',
      'Event three',
      {
        timeStart: '2017-01-18T10:00:00',
        title: 'Outreach Benefit Concert 2',
        description:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  },

  '2018-02-04': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },

  '2018-02-11': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },

  '2018-02-18': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-02-25': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-03-04': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-03-18': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-03-11': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-03-25': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-04-01': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  }
};

const calendarDatesUtils = {
  getEventsForDate: dateString => {
    // return dates['2018-01-18'].events || [];

    const dateObject = dates[dateString];
    return (dateObject && dateObject.events) || [];
  },

  getRenderedEventsForDateMonthView: dateString => {
    const dayEvents = calendarDatesUtils.getEventsForDate(dateString);

    return _.map(dayEvents, (event, index, allEvents) => {
      const title = event.title || event;

      return (
        <div key={index}>
          <span>{title}</span>
          {event === _.last(allEvents) ? null : <hr />}
        </div>
      );
    });
  },

  getFormattedDaysEvents: dayData => {
    return _.map(dayData.events, event => {
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
  },

  getFormattedAnnouncements: quantity => {
    return _.reduce(
      dates,
      (upComingEvents, dayData, dateString) => {
        if (moment(dateString).isSameOrAfter(moment(), 'day')) {
          const events = calendarDatesUtils.getFormattedDaysEvents(dayData);

          upComingEvents.push({
            date: moment(dateString).format('MMMM, D YYYY'),
            events
          });
        }

        return upComingEvents;
      },
      []
    );
  }
};

export default calendarDatesUtils;
