import React from 'react';

import _ from 'lodash';

const dates = {
  getEventsForDate: (dateString) => {
    const dates = [
      {
        date: '2017-07-10',
        events: [{title: 'Vacation Bible School Start'}]
      }, {
        date: '2017-07-14',
        events: ['Vacation Bible School End and Closing Ceremony']
      }, {
        date: '2017-08-27',
        events: [{
          title: 'Outreach Benefit Concert',
          description: 'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
        }]
      }
    ];

    const dateObject = dates.find((date) => date.date === dateString)
    return dateObject && dateObject.events;
  },

  getRenderedEventsForDate: (dateString) => {
    const dayEvents = dates.getEventsForDate(dateString);

    return _.map(dayEvents, (event, index) => {
      const title = event.title || event;
      return (<span key={index}>{title}<br /></span>);
    });
  }
};

export default dates;
