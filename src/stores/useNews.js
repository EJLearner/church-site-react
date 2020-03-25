import moment from 'moment';

import routePaths from '../routePaths';
import commonUtils from '../utils/commonUtils';
import constants from '../utils/constants';

function useNews() {
  const allNews = [
    {
      expireDate: '2020-03-25',
      id: 'no-sanctuary-service',
      postedDate: '2020-03-23',
      text:
        'Please dial in to one of our church conference calls: 12 pm and 7 pm. Conference line: (425) 436-6358. ' +
        'Participant code: 581086',
      title: 'Church-wide Conference Call'
    },
    {
      expireDate: '2020-06-01',
      id: 'no-sanctuary-service',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      postedDate: '2020-03-19',
      text:
        'Due to COVID-19, no in-sanctuary service will be held. Watch Sunday’s sermon.',
      title: 'On-line Sermon Posted'
    },
    {
      expireDate: '2020-06-01',
      id: 'coronavirus-info-posted',
      linkPath: routePaths.MAIN_CORONAVIRUS,
      postedDate: '2020-03-19',
      text:
        'Coronavirus information posted. Visit the Coronavirus Update page for information' +
        'on staying safe and changes in the church.',
      title: 'Coronavirus Information'
    },
    {
      expireDate: '2020-04-04',
      id: 'anniversary-patrons',
      postedDate: '2020-03-19',
      text:
        'The Ushers and Nurses will be selling patrons for their upcoming anniversary. ' +
        'The cost of the patrons is $2.00 per name. See any usher or nurse for more information. ' +
        'Thank you for your continued support.',
      title: 'Anniversary Patrons'
    },
    {
      expireDate: '2020-05-01',
      id: 'website-redesign',
      postedDate: '2020-03-19',
      text: 'Website redesign is live!',
      title: 'Website Redesign'
    }
  ];

  const filteredNews = allNews.filter(newsItem => {
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
    news => news.postedDate,
    constants.SORT_DIRECTION_DESCENDING
  );
}

export default useNews;
