import moment from 'moment';

import routePaths from '../routePaths';
import commonUtils from '../utils/commonUtils';
import constants from '../utils/constants';

function useNews() {
  const allNews = [
    {
      expireDate: '2021-07-06',
      id: 'sermon-phone-recording',
      postedDate: '2021-06-26',
      text: 'The audio of the current week’s sermon is now available 24/7 at 443-203-1958'
    },
    {
      expireDate: '2021-07-06',
      id: 'vbs-registration-landing',
      linkPath: routePaths.CE_VBS_REG_LANDING,
      postedDate: '2021-06-19',
      text: 'Vaction Bible School Is Virtual This Year! Click Here To Register'
    },
    {
      expireDate: '2021-06-30',
      id: 'cash-app',
      postedDate: '2020-03-03',
      text: 'You can now use CashApp to donate! Use CashApp tag “$citytemple317”.'
    },
    {
      expireDate: '2020-06-23',
      id: 'sermon-in-solidarity',
      external: true,
      linkPath: 'https://www.youtube.com/watch?v=uBRcxBm2600&feature=youtu.be',
      postedDate: '2020-06-19',
      text: 'A Sermon in Solidarity'
    },
    {
      expireDate: '2020-06-01',
      id: 'no-sanctuary-service',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      postedDate: '2020-03-19',
      text: 'Due to COVID-19, no in-sanctuary service will be held. Watch Sunday’s sermon.'
    },
    {
      expireDate: '2020-05-01',
      id: 'website-redesign',
      postedDate: '2020-03-19',
      text: 'Website redesign is live!'
    }
  ];

  const filteredNews = allNews.filter((newsItem) => {
    const {id, expireDate, postedDate} = newsItem;

    if (!postedDate) {
      throw new Error(
        `News item with id: ${id} is missing "postedDate". Every news item must have "postedDate" property`
      );
    }

    const expireMoment = moment(
      expireDate,
      constants.INTERNAL_DATE_FORMAT,
      true
    );

    return (
      !expireDate ||
      (expireMoment.isValid() && expireMoment.isAfter(moment(), 'day'))
    );
  });

  return commonUtils.sort(
    filteredNews,
    (news) => news.postedDate,
    constants.SORT_DIRECTION_DESCENDING
  );
}

export default useNews;
