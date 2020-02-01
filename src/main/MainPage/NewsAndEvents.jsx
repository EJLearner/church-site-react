import React, {useState} from 'react';
import moment from 'moment';
import styled from 'styled-components';

import {COLORS, LOGICAL_COLORS} from '../../utils/styleVariables';
import routePaths from '../../routePaths';
import PlainButton from '../commonComponents/PlainButton';
import constants from '../../utils/constants';
import {Link} from 'react-router-dom';
import useFirebaseEvents from '../../stores/useFirebaseEvents';

const NewsEventsContent = styled.div`
  color: ${COLORS.WHITE};
  font-size: 12px;
  padding: 1em;
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  min-width: 300px;
  height: 300px;

  a {
    color: ${COLORS.WHITE};
  }

  h3 {
    color: ${COLORS.WHITE};
    font-size: 14px;
  }
`;

const NewsItem = styled.div`
  margin-bottom: 1em;
`;

const DisplayButton = styled(PlainButton)`
  display: inline-block;
  padding: 1em;
  ${({selected}) =>
    selected
      ? `background-color: ${LOGICAL_COLORS.CT_PRIMARY};
      color: ${COLORS.WHITE};`
      : `background-color: ${LOGICAL_COLORS.CT_SECOND};
      color: ${COLORS.BLACK};`}

  &:hover {
    text-decoration: underline;
  }
`;

const news = [
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

function renderNews() {
  return news.reduce((displayItems, newsItem, index) => {
    const {expireDate, linkPath, text} = newsItem;

    const dateMoment = moment(expireDate, constants.INTERNAL_DATE_FORMAT, true);

    if (dateMoment.isValid() && dateMoment.isAfter(moment())) {
      displayItems.push(
        <NewsItem key={index}>
          <h3>{linkPath ? <Link to={linkPath}>{text}</Link> : text}</h3>
        </NewsItem>
      );
    }

    return displayItems;
  }, []);
}

function renderEvents(events) {
  return events.reduce((displayItems, event, index) => {
    const {dateString, linkPath, title, timeStart} = event;

    const to = linkPath ?? {
      pathname: routePaths.CE_CALENDAR_DAY,
      state: {selectedDay: dateString}
    };

    displayItems.push(
      <NewsItem key={index}>
        <Link to={to}>
          <h3>{title}</h3>
          {moment(dateString).format(constants.DISPLAY_DATE_FORMAT)}{' '}
          {timeStart ? moment(timeStart, 'h:mm A').format('h:mm A') : null}
        </Link>
      </NewsItem>
    );

    return displayItems;
  }, []);
}

const NewsAndEvents = () => {
  const NEWS_DISPLAY = 'news-content';
  const EVENTS_DISPLAY = 'events-display';
  const [displayType, setDisplayType] = useState(NEWS_DISPLAY);

  const events = useFirebaseEvents({futureOnly: true, returnAsArray: true});

  return (
    <div>
      <NewsEventsContent>
        <div>
          {displayType === NEWS_DISPLAY ? renderNews() : renderEvents(events)}
        </div>
      </NewsEventsContent>
      <DisplayButton
        onClick={() => setDisplayType(NEWS_DISPLAY)}
        selected={displayType === NEWS_DISPLAY}
      >
        News
      </DisplayButton>
      <DisplayButton
        onClick={() => setDisplayType(EVENTS_DISPLAY)}
        selected={displayType === EVENTS_DISPLAY}
      >
        Events
      </DisplayButton>
    </div>
  );
};

export default NewsAndEvents;
