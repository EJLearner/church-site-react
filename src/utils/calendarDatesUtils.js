import _ from 'lodash';

import firebase from '../firebase';

let datesStore = {};
const callbacks = {};

const callAllCallbacks = () => {
  _.forEach(callbacks, callback => {
    callback();
  });
};

const loadDates = () => {
  // FBH get a reference for the 'dates' top level prop of the data
  const datesRef = firebase.database().ref('dates');

  // FBH add a listener to the dates object, update on value change (guessing)
  // listener gets the dates object using snapshot.val();
  // then pushes the udpated date object into the state
  datesRef.on('value', snapshot => {
    const retrievedDates = snapshot.val();
    const newState = {};

    _.forEach(retrievedDates, (date, key) => {
      // make an array of events
      const events = _.map(date.events, event => event);
      _.set(newState, `${key}.events`, events);
    });

    datesStore = newState;
    callAllCallbacks();
  });
};

loadDates();

/*
const dates = {
  '2018-02-04': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-04T09:00:00'}]
  },

  '2018-02-11': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-11T09:00:00'}]
  },

  '2018-02-18': {
    events: [
      {title: 'Sunday Church Service', timeStart: '2018-02-18T09:00:00'},
      {
        isAnnouncement: true,
        title: 'City Temple Times submissions due',
        longDescription: (
          <span>
            The next issue of <i>The Times</i> comes out March 2018 and we need
            your submissions! There is much going on within the life of our
            church and our newsletter is an excellent way to make sure the
            information gets communicated to our entire church family. Our 2020
            Vision Workgroups are revving up, the church has begun the
            sacrificial sowing of seeds, and so much more. Please consider
            sharing your thoughts, expressions, and information so that the
            newsletter can remain a vital part of our communication stream!
            Submissions for our March issue are due to April Jones no later than
            Sunday, February 18, 2018 and can be sent to
            <a href="mailto:times@thecitytemple.org">
              {' '}
              times@thecitytemple.org
            </a>.
          </span>
        )
      }
    ]
  },
  // '2018-02-25': {
  //   events: [
  //     {title: 'Sunday Church Service', timeStart: '2018-02-25T09:00:00'},
  //     {
  //       followsWorship: true,
  //       isAnnouncement: true,
  //       longDescription: (
  //         <span>
  //           Come and celebrate
  //           <i>“A Blast From Our Past”</i> The Christian Ed Ministry will
  //           recognize African American poets, musicians and famous designers on
  //           February 25, 2018, following the morning worship service. Lunch will
  //           be served. Open mic poetry, instrumental musical selection or song
  //           and a run way walk for those who’d like to show off their African
  //           Attire. Children of all ages are welcome to express improvisational
  //           forms of art. Please see April Jones or Davina Morton if you’d like
  //           to share a poem or perform a musical selection. You do not want to
  //           miss this event!
  //         </span>
  //       ),
  //       timeStart: '2018-02-25T11:00:00',
  //       title: 'A Blast from Our Past!'
  //     }
  //   ]
  // },

  '2018-02-26': {
    events: [
      {
        isAnnouncement: true,
        longDescription: (
          <span>
            Registration and testing for the next GED class will take place on
            Monday, February 26, 2018 at 9:00 a.m. in the W.W. Payne Center. All
            interested candidates are asked to contact Pat Payne for more
            information.
          </span>
        ),
        timeStart: '2018-02-26T09:00:00',
        title: 'GED Class Registration and testing'
      }
    ]
  },

  '2018-03-04': {
    events: [{title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'}]
  },
  '2018-03-18': {
    events: [
      {title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'},
      'Last day to purchase tickets to see "Jesus"'
    ]
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
  // '2018-04-01': {
  //   events: [
  //     {title: 'Sunday Church Service', timeStart: '2018-02-01T09:00:00'},
  //     'Easter Sunday'
  //   ]
  // },
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
*/

const calendarDatesUtils = {
  getAllDates: () => datesStore,

  getEventsForDate: (allDates, dateString) => {
    // return datesStore['2018-01-18'].events || [];

    const dateObject = allDates[dateString];
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

  listen: (id, callback) => {
    return (callbacks[id] = callback);
  },

  unlisten: id => {
    delete callbacks[id];
  }
};

export default calendarDatesUtils;
