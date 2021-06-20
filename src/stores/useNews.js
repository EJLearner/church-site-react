/* eslint-disable max-len */
import moment from 'moment';

import routePaths from '../routePaths';
import commonUtils from '../utils/commonUtils';
import constants from '../utils/constants';

function useNews() {
  const allNews = [
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
      expireDate: '2020-06-01',
      id: 'coronavirus-info-posted',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      postedDate: '2020-04-04',
      text: 'Coronavirus information has been updated. Visit the Coronavirus Update page for more information.'
    },
    {
      expireDate: '2020-04-04',
      id: 'anniversary-patrons',
      postedDate: '2020-03-19',
      text:
        'The Ushers and Nurses will be selling patrons for their upcoming anniversary. ' +
        'The cost of the patrons is $2.00 per name. See any usher or nurse for more information. ' +
        'Thank you for your continued support.'
    },
    {
      expireDate: '2020-05-01',
      id: 'website-redesign',
      postedDate: '2020-03-19',
      text: 'Website redesign is live!'
    },
    {
      expireDate: '2020-06-01',
      id: 'church-covenant',
      postedDate: '2020-04-04',
      text:
        'Find the Church Covenant and Church Vision on the About Us page for use during ' +
        'Communion Sunday.'
    },
    {
      expireDate: '2020-06-01',
      id: 'scriptures-meditation',
      postedDate: '2020-04-04',
      text:
        'Daily scriptures and weekly meditation are posted weekly. Find the link in the ' +
        'footer menu bar below.'
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
