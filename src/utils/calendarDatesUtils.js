import React from 'react';

import _ from 'lodash';

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
        shortDescription:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  },
  '2018-01-05': {
    events: [
      {
        title: 'Outreach Benefit Concert',
        shortDescription:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      }
    ]
  },
  '2018-01-18': {
    events: [
      'Event two',
      'Event three',
      {
        timeStart: '2018-01-18T10:00:00',
        title: 'Outreach Benefit Concert 2',
        shortDescription:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
      },
      {
        longDescription:
          'The Women’s Ministry invites you to kick-off your yuletide celebrations early! Join us in our Winter Wonderland. There will be delectable Christmas snacks, activities, food, and maybe a visit from Santa himself. Don’t forget your $10 wrapped Christmas gift for our White Elephant game! All of this and more is planned in honor of this blessed season. R.S.V.P. for your family with any member of the Women’s Ministry. If you would like to contribute to this event, please see Min. Patricia Yeargin or Sis. Phyllis Day.',
        shortDescription:
          'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!',
        title: 'Outreach Benefit Concert',
        timeStart: '2018-01-18T08:00:00',
        timeEnd: '2018-01-18T10:00:00',
        location: 'Undercroft'
      }
    ]
  },

  '2018-02-04': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-04T09:00:00'}]
  },

  '2018-02-11': {
    events: [
      {title: 'Sorting Test', timeStart: '2018-02-11T05:00:00'},
      {title: 'Sunday Church Service', timeStart: '2018-02-11T09:00:00'},
      {title: 'Sorting Test also', timeStart: '2018-02-11T05:00:00'},
      'No Time',
      'No Time either'
    ]
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
  getAllDates: () => dates,

  getEventsForDate: dateString => {
    // return dates['2018-01-18'].events || [];

    const dateObject = dates[dateString];
    const unsortedEvents = (dateObject && dateObject.events) || [];

    return unsortedEvents.sort((a, b) => {
      const timeStartA = a.timeStart || '';
      const timeStartB = b.timeStart || '';

      if (timeStartA < timeStartB) {
        return -1;
      }

      if (timeStartA > timeStartB) {
        return 1;
      }

      return 0;
    });
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
  }
};

export default calendarDatesUtils;
