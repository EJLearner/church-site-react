import {useState, useEffect} from 'react';

import firebase from '../firebase';
import constants from '../utils/constants';
import {generateRecurringEvents} from '../utils/eventUtils';

function useFirebaseRecurringEvents(options = {}) {
  const {futureOnly} = options;

  const [events, setEventsList] = useState({});

  useEffect(() => {
    const recurringEventesRef = firebase
      .database()
      .ref(constants.FB_REC_EVENTS);

    recurringEventesRef.on('value', (snapshot) => {
      const recurringEventDates = generateRecurringEvents(
        Object.values(snapshot.val() ?? {})
      );

      const newState = {};

      Object.keys(recurringEventDates).forEach((date) => {
        const eventInfo = recurringEventDates[date];
        // make an array of events
        if (eventInfo.events) {
          const dateEvents = Object.values(eventInfo.events).map(
            (event) => event
          );
          newState[date] = {events: dateEvents};
        }
      });

      setEventsList(newState);
    });
  }, [futureOnly]);

  return events;
}

export default useFirebaseRecurringEvents;
