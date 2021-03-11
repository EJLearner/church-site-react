import {useState, useEffect} from 'react';

import constants from '../utils/constants';
import {generateRecurringEvents} from '../utils/eventUtils';

const fakeStoreRecurringEvents = [
  {
    title: 'Better Bible Study',
    timeStart: '20:00',
    reccurence: {day: constants.daysOfWeek.MONDAY, frequency: 'weekly'},
    skippedDays: []
    // would also like to do 'nth and last of a weekday in a month'
  }
];

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
