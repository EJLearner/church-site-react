import moment from 'moment';
import routePaths from '../routePaths';
import constants from '../utils/constants';
import commonUtils from '../utils/commonUtils';

function useNews() {
  const allNews = [
    {
      text:
        'Stewardship Reports for the 2019 tax year are now available. See Michele Williams for your statement. !',
      linkPath: routePaths.MAIN_HOME,
      expireDate: '2020-03-15',
      sortOrder: 20
    },
    {
      text:
        'Bible Study conference call number for Wednesday night bible study is 1-712-770-8094 code 990142.',
      sortOrder: 10
    },
    {
      text: 'News: Website redesign is live!',
      linkPath: routePaths.MAIN_HOME,
      expireDate: '2020-05-01'
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