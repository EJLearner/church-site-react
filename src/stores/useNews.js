import moment from 'moment';

import routePaths from '../routePaths';
import commonUtils from '../utils/commonUtils';
import constants from '../utils/constants';

function useNews() {
  const allNews = [
    {
      expireDate: '2020-06-01',
      id: 'coronavirus-info',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      sortOrder: 1,
      text:
        'Due to COVID-19, no in-sanctuary service will be held. Watch Sunday’s sermon.',
      title: 'On-line Sermon Posted'
    },
    {
      expireDate: '2020-06-01',
      id: 'coronavirus-info',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      sortOrder: 1,
      text:
        'Coronavirus information posted. Visit the Coronavirus Update page for information' +
        'on staying safe and changes in the church.',
      title: 'Coronavirus Information'
    },
    {
      expireDate: '2020-03-15',
      id: 'reports',
      linkPath: routePaths.MAIN_HOME,
      sortOrder: 20,
      text:
        'Stewardship Reports for the 2019 tax year are now available. See Michele Williams for your statement!'
    },
    {
      expireDate: '2020-04-04',
      id: 'anniversary-patrons',
      text:
        'The Ushers and Nurses will be selling patrons for their upcoming anniversary. ' +
        'The cost of the patrons is $2.00 per name. See any usher or nurse for more information. ' +
        'Thank you for your continued support.',
      title: 'Anniversary Patrons'
    },
    {
      expireDate: '2020-05-01',
      id: 'website-redesign',
      text: 'Website redesign is live!',
      title: 'Website Redesign'
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
