import {useState, useEffect} from 'react';

import {fakeStoreRecurringEvents} from '../ce/utils/fakeStoreRecurringEvents';
import {generateRecurringEvents} from '../utils/eventUtils';

function useFirebaseRecurringEvents(options = {}) {
  const {futureOnly} = options;

  const [events, setEventsList] = useState({});

  useEffect(() => {
    const recurringEventDates = generateRecurringEvents(
      fakeStoreRecurringEvents
    );

    const newState = {};

    Object.keys(recurringEventDates).forEach((date) => {
      const eventInfo = recurringEventDates[date];
      // make an array of events
      if (eventInfo.events) {
        const events = Object.values(eventInfo.events).map((event) => event);
        newState[date] = {events};
      }
    });

    setEventsList(newState);
  }, [futureOnly]);

  return events;
}

export default useFirebaseRecurringEvents;
