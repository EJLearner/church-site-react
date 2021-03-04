import {useState, useEffect} from 'react';

import firebase from '../firebase';
import constants from '../utils/constants';
import {
  addDays,
  endOfYesterday,
  format,
  getHours,
  getMinutes,
  getStandardDateString,
  isAfter,
  isSameMonth,
  parse,
  parseISO,
  startOfDay,
  startOfToday,
  set,
  getDay
} from '../utils/dateTimeUtils';

const sortEventsByStartTime = (events) => {
  return events.sort((a, b) => {
    const timeStartA = a.timeStart || '';
    const timeStartB = b.timeStart || '';

    if (timeStartA === timeStartB) {
      return 0;
    }

    // just doing string compare since standard date-time string is used
    return timeStartA < timeStartB ? -1 : 1;
  });
};

function useFirebaseEvents(options = {}) {
  const {futureOnly, returnAsArray} = options;

  const [events, setEventsList] = useState({});

  useEffect(() => {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref(constants.FB_REF_EVENTS);

    // FBH add a listener to the dates object, update on value change
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', (snapshot) => {
      const retrievedDates = snapshot.val();
      const newState = {};

      const recurringEvents = [
        {
          title: 'Better Bible Study',
          timeStart: '20:00',
          reccurence: {day: constants.daysOfWeek.FRIDAY, frequency: 'weekly'},
          skippedDays: []
          // would also like to do 'nth and last of a weekday in a month'
        }
      ];

      const today = startOfToday();
      let currentDate = today;

      while (isSameMonth(currentDate, today)) {
        // seems safe, tested that the correct values are retrieved
        // eslint-disable-next-line no-loop-func
        const recurringEventsWithSameDay = recurringEvents.filter((event) => {
          return getDay(currentDate) === event.reccurence.day;
        });

        const recurringEventsWithCorrectFrequency = recurringEventsWithSameDay;

        if (recurringEventsWithCorrectFrequency.length) {
          const dateString = getStandardDateString(currentDate);

          if (!retrievedDates[dateString]) {
            retrievedDates[dateString] = {events: {}};
          }

          recurringEventsWithCorrectFrequency.forEach((event) => {
            const eventDate = parseISO(dateString);
            const eventTime = parse(event.timeStart, 'HH:mm', new Date());
            const eventTimeObject = set(eventDate, {
              hours: getHours(eventTime),
              minutes: getMinutes(eventTime)
            });

            const eventDateTime = format(
              eventTimeObject,
              constants.DATE_FNS_DATE_TIME
            );

            retrievedDates[dateString].events[eventDateTime + event.title] = {
              timeStart: eventDateTime,
              title: event.title
            };
          });
        }
        currentDate = addDays(currentDate, 1);
      }

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

  if (returnAsArray) {
    const datesAsArray = Object.keys(events).reduce(
      (eventsArray, dateString) => {
        const sortedDateEvents = sortEventsByStartTime(
          events[dateString].events
        );

        sortedDateEvents.forEach((event) => {
          const eventWithDate = {
            ...event,
            dateString
          };

          eventsArray.push(eventWithDate);
        });

        return eventsArray;
      },
      []
    );

    return sortEventsByStartTime(datesAsArray);
  }

  return events;
}

export default useFirebaseEvents;
