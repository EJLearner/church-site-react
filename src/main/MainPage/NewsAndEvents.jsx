import React, {useState} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {COLORS, LOGICAL_COLORS} from '../../utils/styleVariables';
import routePaths from '../../routePaths';
import PlainButton from '../commonComponents/PlainButton';
import constants from '../../utils/constants';
import {Link} from 'react-router-dom';

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

const events = [
  {
    text: 'Event: Website redesign is live!',
    date: '2020-02-01',
    time: '03:00 PM',
    expireDate: '2020-02-15'
  },
  {
    text: 'Event: Website redesign is live!',
    date: '2020-02-01',
    linkPath: routePaths.MAIN_HOME,
    expireDate: '2020-02-15'
  },
  {
    text: 'Event: Website redesign is live!',
    date: '2020-02-01',
    linkPath: routePaths.MAIN_HOME,
    expireDate: '2020-02-15'
  },
  {
    text: 'Event: Website redesign is live!',
    date: '2020-02-01',
    linkPath: routePaths.MAIN_HOME,
    expireDate: '2020-02-15'
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

function renderEvents() {
  return events.reduce((displayItems, event, index) => {
    const {expireDate, date, linkPath, text, time} = event;

    const dateMoment = moment(expireDate, constants.INTERNAL_DATE_FORMAT, true);

    if (dateMoment.isValid() && dateMoment.isAfter(moment())) {
      const to = linkPath ?? {
        pathname: routePaths.CE_CALENDAR_DAY,
        state: {selectedDay: date}
      };

      displayItems.push(
        <NewsItem key={index}>
          <Link to={to}>
            <h3>{text}</h3>
            {dateMoment.format(constants.DISPLAY_DATE_FORMAT)}{' '}
            {moment(time).format('h:mm A')}
          </Link>
        </NewsItem>
      );
    }

    return displayItems;
  }, []);
}

const NewsAndEvents = props => {
  const NEWS_DISPLAY = 'news-content';
  const EVENTS_DISPLAY = 'events-display';

  const [displayType, setDisplayType] = useState(EVENTS_DISPLAY);

  return (
    <div>
      <NewsEventsContent>
        <div>
          {displayType === NEWS_DISPLAY ? renderNews() : renderEvents()}
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
