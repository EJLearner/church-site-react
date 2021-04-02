import constants from '../../utils/constants';

export const fakeStoreRecurringEvents = [
  {
    title: 'Better Bible Study',
    timeStart: '20:00',
    reccurence: {day: constants.daysOfWeek.MONDAY, frequency: 'weekly'},
    skippedDates: ['2021-04-19']
    // would also like to do 'nth and last of a weekday in a month'
  }
];
