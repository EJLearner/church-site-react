import React from 'react';
import styled from 'styled-components';

import routePaths from '../routePaths';
import useNews from '../stores/useNews';
import constants from '../utils/constants';
import {format, parseISO} from '../utils/dateTimeUtils';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

const StyleWrapper = styled.div`
  .news-item {
    h2 {
      font-size: 20px;
      margin-bottom: 0;
      margin-top: 35px;
    }

    h2.first-header {
      margin-top: 0em;
    }

    .update-date {
      font-size: 16px;
    }
  }
`;

function getNewsItems(news) {
  const newsItems = news.map((info, index) => {
    const {id, title, updateDate, text} = info;
    const className = index ? null : 'first-header';
    let updatedDate;

    if (updateDate) {
      const jsUpdateDate = parseISO(updateDate);
      updatedDate = format(
        jsUpdateDate,
        constants.DATE_FNS_DISPLAY_DATE_FORMAT
      );
    }

    return (
      <div className="news-item" key={id}>
        <h2 className={className} id={id}>
          {title}
          {updatedDate && (
            <span className="update-date"> - updated({updatedDate})</span>
          )}
        </h2>
        {text}
      </div>
    );
  });

  return <div>{newsItems}</div>;
}

const topBoxContent = (
  <div>
    <div>
      <h1>News</h1>
    </div>
    <p>
      Ministry provides an effective way to offer tangible, practical help to
      those in our church and community; and contribute to kingdom building. We
      are inspired to minister in order to fulfill the Great Commandment of the
      Lord: “You shall love the Lord your God with all your heart, with all your
      soul, and with all your mind” and “You shall love your neighbor as
      yourself,” and fulfill the Great Commission.
    </p>
  </div>
);

const WatchPage = () => {
  const news = useNews();

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>{topBoxContent}</TopInfoBox>
        </TopInfoBoxWrapper>

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

export default WatchPage;
