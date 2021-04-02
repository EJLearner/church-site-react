import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import endOfYesterday from 'date-fns/endOfYesterday';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isPast from 'date-fns/isPast';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import set from 'date-fns/set';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';
import startOfTomorrow from 'date-fns/startOfTomorrow';
import startOfWeek from 'date-fns/startOfWeek';

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

const getStandardDateString = (date) => format(date, 'yyyy-MM-dd');

export {
  addDays,
  addMonths,
  addYears,
  convertValidTypedDateToIso as convertTypedDateToIso,
  convertValidTypedDateToIso,
  endOfYesterday,
  format,
  getDay,
  getDaysUntilDate,
  getStandardDateString,
  getHours,
  getMinutes,
  getStartOfWeek,
  getLongDisplayDate,
  getShortDisplayDate,
  isAfter,
  isBefore,
  isPast,
  isSameDay,
  isSameMonth,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfToday,
  startOfTomorrow
};
