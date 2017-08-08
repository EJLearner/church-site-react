import React from 'react';

import _ from 'lodash';

const dates = {
  getEventsForDate: (dayMoment) => {
    const dayMomentYear = dayMoment.format('YYYY');
    const dayMomentMonth = dayMoment.format('MMM');
    const dayMomentDate = dayMoment.format('DD');
    const events = {
      '2017': {
        'Jul': {
          '10': [
            {
              title: 'Vacation Bible School Start'
            }
          ],
          '14': ['Vacation Bible School End and Closing Ceremony'],
        },
        'Aug' : {
          '27' : [
            {
              title: 'Outreach Benefit Concert',
              description: 'The Outreach Ministry is sponsoring an Outreach Benefit Conert featuring Gary Stewart!!'
            }
          ]
        }
      }
    };



    return _.get(events, `[${dayMomentYear}][${dayMomentMonth}][${dayMomentDate}]`);
  },

  getRenderedEventsForDate: (dayMoment) => {
    const dayEvents = dates.getEventsForDate(dayMoment);

    return _.map(dayEvents, (event, index) => {
      const title = event.title || event;
      return (<span key={index}>{title}<br /></span>);
    });
  }
};

export default dates;
