import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import endOfYesterday from 'date-fns/endOfYesterday';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isPast from 'date-fns/isPast';
import isSameDay from 'date-fns/isSameDay';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';
import startOfTomorrow from 'date-fns/startOfTomorrow';
import startOfWeek from 'date-fns/startOfWeek';
import {Temporal as TemporalPolyfill} from 'temporal-polyfill';

import constants from './constants';

const getLongDisplayDate = (date) => format(parseISO(date), 'MMMM d, yyyy');
const getShortDisplayDate = (date) =>
  format(parseISO(date), constants.DATE_FNS_DISPLAY_DATE_FORMAT);

const getStartOfWeek = (formatString) => {
  const jsSundayTime = startOfWeek(new Date());

  return formatString ? format(jsSundayTime, formatString) : jsSundayTime;
};

const convertValidTypedDateToIso = (date) => {
  const dateObj = parse(date, 'MM/dd/yyyy', new Date());
  return isValid(dateObj) ? formatISO(dateObj, {representation: 'date'}) : date;
};

const getDaysUntilDate = (date) =>
  differenceInCalendarDays(parseISO(date), new Date());

const getNumberOfDaysAgo = (date) => {
  return differenceInCalendarDays(new Date(), parseISO(date));
};

const isoTimeHasPassed = (time) => {
  const dateObj = parseISO(time);
  return isPast(dateObj);
};

const getSundayOfYearIndex = (date) => {
  const temporalDate = TemporalPolyfill.PlainDate.from(date);

  const startOfYear = TemporalPolyfill.PlainDate.from({
    year: temporalDate.year,
    month: 1,
    day: 1,
  });

  // adds the number of days between the start of the year and the first Sunday
  const daysToAdd = 7 - startOfYear.dayOfWeek;

  const firstSunday = startOfYear.add({days: daysToAdd % 7});

  return temporalDate.since(firstSunday).days / 7;
};

export {
  convertValidTypedDateToIso as convertTypedDateToIso,
  convertValidTypedDateToIso,
  endOfYesterday,
  format,
  getDaysUntilDate,
  getNumberOfDaysAgo,
  getStartOfWeek,
  getLongDisplayDate,
  getShortDisplayDate,
  getSundayOfYearIndex,
  isAfter,
  isBefore,
  isoTimeHasPassed,
  isPast,
  isSameDay,
  parseISO,
  startOfDay,
  startOfToday,
  startOfTomorrow,
};
