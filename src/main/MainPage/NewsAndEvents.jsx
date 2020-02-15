import React, {useState} from 'react';
import moment from 'moment';
import styled from 'styled-components';

import {COLORS, LOGICAL_COLORS} from '../../utils/styleVariables';
import routePaths from '../../routePaths';
import PlainButton from '../commonComponents/PlainButton';
import {Link} from 'react-router-dom';
import useFirebaseEvents from '../../stores/useFirebaseEvents';
import useFirebaseNews from '../../stores/useFirebaseNews';

const NewsEventsStyle = styled.div`
  .news-and-events-content {
    color: ${COLORS.WHITE};
    font-size: 12px;
    padding: 1em;
    background-color: ${LOGICAL_COLORS.CT_PRIMARY};
    width: 300px
    height: 300px;

    .news-item {
      margin-bottom: 2em;
    }
  }

  a {
    color: ${COLORS.WHITE};
  }

  h3 {
    color: ${COLORS.WHITE};
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 6px;
  }

  .date-and-time {
    font-style: italic;
    margin-left: 4em;
  }

  .more-link {
    border-top: 1px solid white;
    display: inline-block;
    font-weight: bold;
    margin-top: 1em;
    padding-top: 1em;
    text-transform: uppercase;
  }
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

function renderNews(news) {
  return news.map((newsItem, index) => {
    const {linkPath, text} = newsItem;

    return (
      <div className="news-item" key={index}>
        <h3>{linkPath ? <Link to={linkPath}>{text}</Link> : text}</h3>
      </div>
    );
  });
}

function renderEventsList(events) {
  return events.reduce((displayItems, event, index) => {
    const {dateString, linkPath, title, timeStart} = event;

    const to = linkPath ?? {
      pathname: routePaths.CE_CALENDAR_DAY,
      state: {selectedDay: dateString}
    };

    displayItems.push(
      <div className="news-item" key={index}>
        <Link to={to}>
          <h3>{title}</h3>
          <div className="date-and-time">
            {moment(dateString).format('dddd, MMMM D')}{' '}
            {timeStart ? moment(timeStart, 'h:mm A').format(' @ h:mm A') : null}
          </div>
        </Link>
      </div>
    );

    return displayItems;
  }, []);
}

function renderMoreEventsLink() {
  return (
    <Link className="more-link" to={routePaths.MAIN_CALENDAR_UPCOMING}>
      More Events
    </Link>
  );
}

function renderEvents(events) {
  const numberofEventsToDisplay = 3;
  const displayedEvents = events.slice(0, numberofEventsToDisplay);

  const eventsAreTruncated = displayedEvents.length !== events.length;

  return (
    <>
      {renderEventsList(displayedEvents)}
      {eventsAreTruncated && renderMoreEventsLink()}
    </>
  );
}

const NewsAndEvents = () => {
  const NEWS_DISPLAY = 'news-content';
  const EVENTS_DISPLAY = 'events-display';
  const [displayType, setDisplayType] = useState(EVENTS_DISPLAY);

  const events = useFirebaseEvents({
    futureOnly: true,
    returnAsArray: true
  });

  const news = useFirebaseNews();

  return (
    <NewsEventsStyle>
      <div className="news-and-events-content">
        {displayType === NEWS_DISPLAY ? renderNews(news) : renderEvents(events)}
      </div>
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
    </NewsEventsStyle>
  );
};

export default NewsAndEvents;
