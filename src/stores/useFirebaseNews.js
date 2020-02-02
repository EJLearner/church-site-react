import moment from 'moment';
import routePaths from '../routePaths';
import constants from '../utils/constants';

// TODO: pull news from firebase data

function useNews() {
  const allNews = [
    {
      text: 'News: Website redesign is live!',
      linkPath: routePaths.MAIN_HOME,
      expireDate: '2020-02-15'
    },
    {
      text: 'News: Website redesign is live!',
      expireDate: '2020-02-15'
    },
    {
      text: 'News: Website redesign is live!',
      linkPath: routePaths.MAIN_HOME,
      expireDate: '2019-02-15'
    }
  ];

  return allNews.filter(newsItem => {
    const {expireDate} = newsItem;

    const expireMoment = moment(
      expireDate,
      constants.INTERNAL_DATE_FORMAT,
      true
    );

    return expireMoment.isValid() && expireMoment.isAfter(moment(), 'day');
  });
}

export default useNews;
