import _ from 'lodash';

import firebase from '../../firebase';
import commonUtils from '../../utils/commonUtils';
import constants from '../../utils/constants';
import {generateRecurringEvents} from '../../utils/eventUtils';

let singleEvents = {};
let processedDates = {};
let recurringEvents = {};
const callbacks = {};

const recombineEvents = () => {
  const rawDates = {};
  commonUtils.merge(rawDates, singleEvents, recurringEvents);

  processedDates = {};

  _.forEach(rawDates, (date, key) => {
    // make an array of events
    const events = _.map(date.events, (event) => event);
    _.set(processedDates, `${key}.events`, events);
  });
};

const callAllCallbacks = () => {
  _.forEach(callbacks, (callback) => {
    callback();
  });
};

const loadDates = () => {
  // FBH get a reference for the 'dates' top level prop of the data
  const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

  // FBH add a listener to the dates object, update on value change
  // listener gets the dates object using snapshot.val();
  // then pushes the updated date object into the state
  datesRef.on('value', (snapshot) => {
    const retrievedDates = snapshot.val();

    singleEvents = retrievedDates;

    recombineEvents();
    callAllCallbacks();
  });
};

const loadRecurringEvents = () => {
  // FBH get a reference for the 'dates' top level prop of the data
  const recurringEventsRef = firebase.database().ref(constants.FB_REC_EVENTS);

  // FBH add a listener to the dates object, update on value change
  // listener gets the dates object using snapshot.val();
  // then pushes the updated date object into the state
  recurringEventsRef.on('value', (snapshot) => {
    const retrievedDates = Object.values(snapshot.val() ?? {});

    recurringEvents = generateRecurringEvents(retrievedDates);

    recombineEvents();
    callAllCallbacks();
  });

  recombineEvents();
  callAllCallbacks();
};

loadDates();
loadRecurringEvents();

const calendarDatesUtils = {
  getAllDates: () => processedDates,

  getEventsForDate: (allDates, dateString) => {
    const dateObject = allDates[dateString];
    const unsortedEvents = dateObject?.events || [];

    return unsortedEvents.sort((a, b) => {
      const timeStartA = a.timeStart || '';
      const timeStartB = b.timeStart || '';

      if (timeStartA === timeStartB) {
        return 0;
      }

      // just doing string compare since standard date-time string is used
      return timeStartA < timeStartB ? -1 : 1;
    });
  },

  listen: (id, callback) => {
    return (callbacks[id] = callback);
  },

  unlisten: (id) => {
    delete callbacks[id];
  }
};

export default calendarDatesUtils;
