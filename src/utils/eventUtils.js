import constants from '../utils/constants';
import {
  addDays,
  addYears,
  format,
  getHours,
  getMinutes,
  getStandardDateString,
  parse,
  parseISO,
  startOfToday,
  set,
  getDay,
  isBefore
} from '../utils/dateTimeUtils';
function sortEventsByStartTime(events) {
  return events.sort((a, b) => {
    const timeStartA = a.timeStart || '';
    const timeStartB = b.timeStart || '';

    if (timeStartA === timeStartB) {
      return 0;
    }

    // just doing string compare since standard date-time string is used
    return timeStartA < timeStartB ? -1 : 1;
  });
}

function eventsToArray(events) {
  const datesAsArray = Object.keys(events).reduce((eventsArray, dateString) => {
    const sortedDateEvents = sortEventsByStartTime(events[dateString].events);

    sortedDateEvents.forEach((event) => {
      const eventWithDate = {
        ...event,
        dateString
      };

      eventsArray.push(eventWithDate);
    });

    return eventsArray;
  }, []);

  return sortEventsByStartTime(datesAsArray);
}

function generateRecurringEvents(recurringEvents, span = {}) {
  const {endTime = addYears(new Date(), 1)} = span;
  const today = startOfToday();
  let currentDate = today;

  const recurringEventDates = {};

  while (isBefore(currentDate, endTime)) {
    const dateString = getStandardDateString(currentDate);
    // seems safe, tested that the correct values are retrieved
    // eslint-disable-next-line no-loop-func
    const eventsWithSameDayAndNotSkipped = recurringEvents.filter((event) => {
      return (
        getDay(currentDate) === event.reccurence.day &&
        !event.skippedDates?.includes(dateString)
      );
    });

    const recurringEventsWithCorrectFrequency = eventsWithSameDayAndNotSkipped;

    if (recurringEventsWithCorrectFrequency.length) {
      const dateString = getStandardDateString(currentDate);

      if (!recurringEventDates[dateString]) {
        recurringEventDates[dateString] = {events: {}};
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

        recurringEventDates[dateString].events[eventDateTime + event.title] = {
          timeStart: eventDateTime,
          title: event.title
        };
      });
    }

    currentDate = addDays(currentDate, 1);
  }

  return recurringEventDates;
}

export {eventsToArray, generateRecurringEvents};
