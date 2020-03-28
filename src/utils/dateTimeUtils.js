import endOfYesterday from 'date-fns/endOfYesterday';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';

import constants from './constants';

const getLongDisplayDate = date => format(parseISO(date), 'MMMM d, yyyy');
const getShortDisplayDate = date =>
  format(parseISO(date), constants.DATE_FNS_DISPLAY_DATE_FORMAT);

export {
  endOfYesterday,
  getLongDisplayDate,
  getShortDisplayDate,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
  startOfToday
};
