import _ from 'lodash';

import firebase from '../../firebase';

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

const calendarDatesUtils = {
  getAllDates: () => datesStore,

  getEventsForDate: (allDates, dateString) => {
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
