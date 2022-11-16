import React from 'react';
import styled from 'styled-components';

import routePaths from '../routePaths';
import useNews from '../stores/useNews';
import constants from '../utils/constants';
import {format, parseISO} from '../utils/dateTimeUtils';

import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';

const SPACE_BETWEEN_HEADERS = '35px';

const StyleWrapper = styled.div`
  h2.content-header {
    font-size: 20px;
    margin-bottom: 0;
    margin-top: ${SPACE_BETWEEN_HEADERS};
  }

  .update-date + h2 {
    margin-top: 0em;
  }

  .update-date {
    margin-top: 35px;
    margin-bottom: 12px;
    display: block;
    font-size: 12px;
  }

  .update-date:first-of-type {
    margin-top: 0;
  }
`;

function getNewsItems(news) {
  let savedPostedDate;

  const newsItems = news.reduce((newsRender, info) => {
    const {id, title, postedDate, text} = info;

    if (postedDate !== savedPostedDate) {
      savedPostedDate = postedDate;

      const jsPostedDate = parseISO(postedDate);
      const formattedUpdatedDate = format(
        jsPostedDate,
        constants.DATE_FNS_DISPLAY_DATE_FORMAT
      );

      newsRender.push(
        <i className="update-date">posted {formattedUpdatedDate}</i>
      );
    }

    newsRender.push(
      <>
        <h2 className="content-header" id={id}>
          {title}
        </h2>
        {text}
      </>
    );

    return newsRender;
  }, []);

  return <div>{newsItems}</div>;
}

const NewsPage = () => {
  const news = useNews();

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <ContentAndSubCompassWrapper>
          <AboveContentLinks pagePath={routePaths.MAIN_NEWS} pageTitle="News" />
          <ContentAndSides>
            <ContentLeftSide>
              <SideMenu
                currentId="news"
                menuData={[
                  {
                    id: 'news',
                    subLinks: news.map(({title, id}) => ({
                      elementId: id,
                      title
                    })),
                    title: 'News'
                  }
                ]}
                onClick={() => {}}
                title="news"
              />
            </ContentLeftSide>
            <ContentWrapper>{getNewsItems(news)}</ContentWrapper>
            <ContentRightSide />
          </ContentAndSides>
        </ContentAndSubCompassWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
};

export default NewsPage;
