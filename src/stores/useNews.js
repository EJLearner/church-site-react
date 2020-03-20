import routePaths from '../routePaths';
import commonUtils from '../utils/commonUtils';
import constants from '../utils/constants';

import moment from 'moment';

function useNews() {
  const allNews = [
    {
      text:
        'Stewardship Reports for the 2019 tax year are now available. See Michele Williams for your statement!',
      linkPath: routePaths.MAIN_HOME,
      expireDate: '2020-03-15',
      sortOrder: 20,
      id: 'reports'
    },
    {
      text:
        'Bible Study conference call number for Wednesday night bible study is 1-712-770-8094 code 990142.',
      sortOrder: 10,
      title: 'Bible Study Conference Call',
      id: 'bible-study'
    },
    {
      text:
        'The Ushers and Nurses will be selling patrons for their upcoming anniversary. ' +
        'The cost of the patrons is $2.00 per name. See any usher or nurse for more information. ' +
        'Thank you for your continued support.',
      expireDate: '2020-04-04',
      title: 'Anniversary Patrons',
      id: 'anniversary-patrons'
    },
    {
      text: 'Website redesign is live!',
      expireDate: '2020-05-01',
      title: 'Website Redesign',
      id: 'website-redesign'
    },
    {
      text: 'Coronavirus information posted',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      sortOrder: 1,
      expireDate: '2020-06-01',
      title: 'Coronavirus Information',
      id: 'coronavirus-info',
      updateDate: '2020-03-19'
    }
  ];

  const filteredNews = allNews.filter(newsItem => {
    const {expireDate} = newsItem;

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
    news => news.sortOrder ?? Number.POSITIVE_INFINITY
  );
}

export default useNews;
