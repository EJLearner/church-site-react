import {startOfWeek} from 'date-fns';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import endOfYesterday from 'date-fns/endOfYesterday';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';
import startOfTomorrow from 'date-fns/startOfTomorrow';

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

export {
  convertValidTypedDateToIso as convertTypedDateToIso,
  convertValidTypedDateToIso,
  endOfYesterday,
  format,
  getDaysUntilDate,
  getStartOfWeek,
  getLongDisplayDate,
  getShortDisplayDate,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  startOfToday,
  startOfTomorrow
};
