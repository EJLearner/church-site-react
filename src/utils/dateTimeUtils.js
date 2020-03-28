import endOfYesterday from 'date-fns/endOfYesterday';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';
import startOfTomorrow from 'date-fns/startOfTomorrow';

import constants from './constants';

const getLongDisplayDate = date => format(parseISO(date), 'MMMM d, yyyy');
const getShortDisplayDate = date =>
  format(parseISO(date), constants.DATE_FNS_DISPLAY_DATE_FORMAT);

export {
  endOfYesterday,
  format,
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
