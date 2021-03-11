import {useState, useEffect} from 'react';

import firebase from '../firebase';
import constants from '../utils/constants';
import {
  endOfYesterday,
  isAfter,
  parseISO,
  startOfDay
} from '../utils/dateTimeUtils';

function useFirebaseEvents(options = {}) {
  const {futureOnly} = options;

  const [events, setEventsList] = useState({});

  useEffect(() => {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

    // FBH add a listener to the dates object, update on value change
    // listener gets the dates object using snapshot.val();
    // then pushes the updated date object into the state
    datesRef.on('value', (snapshot) => {
      const retrievedDates = snapshot.val();
      const newState = {};

      Object.keys(retrievedDates).forEach((date) => {
        const jsDate = parseISO(date);
        const startOfJsDate = startOfDay(jsDate);
        const isInFuture = isAfter(startOfJsDate, endOfYesterday());

        if (!futureOnly || isInFuture) {
          const eventInfo = retrievedDates[date];
          // make an array of events
          if (eventInfo.events) {
            const events = Object.values(eventInfo.events).map(
              (event) => event
            );
            newState[date] = {events};
          }
        }
      });

      setEventsList(newState);
    });
  }, [futureOnly]);

  return events;
}

export default useFirebaseEvents;
