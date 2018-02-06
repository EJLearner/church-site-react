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
  '2018-01-18': {
    events: [
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
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-11T09:00:00'}]
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
    events: [
      {title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'},
      'Palm Sunday'
    ]
  },
  '2018-04-01': {
    events: [
      {title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'},
      'Easter Sunday'
    ]
  },
  '2018-01-01': {
    events: ['New Year’s Day']
  },
  '2018-01-15': {
    events: ['Martin Luther King, Jr. Day']
  },
  '2018-02-14': {
    events: ['Ash Wednesday', 'Valentine’s Day']
  },
  '2018-03-17': {
    events: ['St. Patrick’s Day']
  },
  '2018-03-29': {
    events: ['Maundy Thursday']
  },
  '2018-03-30': {
    events: ['Good Friday']
  },
  '2018-03-31': {
    events: ['Holy Saturday', 'Passover Starts']
  },
  '2018-04-07': {
    events: ['Passover Ends']
  },
  '2018-05-13': {
    events: ['Mother’s Day']
  },
  '2018-05-28': {
    events: ['Memorial Day']
  },
  '2018-06-10': {
    events: ['Children’s Day']
  },
  '2018-06-17': {
    events: ['Father’s Day']
  },
  '2018-07-04': {
    events: ['Independence Day']
  },
  '2018-09-03': {
    events: ['Labor Day']
  },
  '2018-10-08': {
    events: ['Columbus Day']
  },
  '2018-11-12': {
    events: ['Veterans Day']
  },
  '2018-11-22': {
    events: ['Thanksgiving Day']
  },
  '2018-12-24': {
    events: ['Christmas Eve']
  },
  '2018-12-25': {
    events: ['Christmas Day']
  },
  '2018-12-31': {
    events: ['New Year’s Eve']
  },
  '2019-01-01': {
    events: ['New Year’s Day']
  },
  '2019-01-21': {
    events: ['Martin Luther King, Jr. Day']
  },
  '2019-03-06': {
    events: ['Ash Wednesday']
  },
  '2019-02-14': {
    events: ['Valentine’s Day']
  },
  '2019-03-17': {
    events: ['St. Patrick’s Day']
  },
  '2019-04-14': {
    events: ['Palm Sunday']
  },
  '2019-04-18': {
    events: ['Maundy Thursday']
  },
  '2019-04-19': {
    events: ['Good Friday']
  },
  '2019-04-20': {
    events: ['Holy Saturday', 'Passover Starts']
  },
  '2019-04-21': {
    events: ['Easter Sunday']
  },
  '2019-04-27': {
    events: ['Passover Ends']
  },
  '2019-05-12': {
    events: ['Mother’s Day']
  },
  '2019-05-27': {
    events: ['Memorial Day']
  },
  '2019-06-09': {
    events: ['Children’s Day']
  },
  '2019-06-16': {
    events: ['Father’s Day']
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
