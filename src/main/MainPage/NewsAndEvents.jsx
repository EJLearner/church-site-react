import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import useFirebaseEvents from '../../stores/useFirebaseEvents';
import useNews from '../../stores/useNews';
import {parseISO, format} from '../../utils/dateTimeUtils';
import {
  FONT_FAMILIES,
  COLORS,
  LOGICAL_COLORS
} from '../../utils/styleVariables';
import PlainButton from '../commonComponents/PlainButton';

const NEWS_AND_EVENTS_BOX_HEIGHT = '300';
const MAX_NEWS_DISPLAY_HEIGHT = NEWS_AND_EVENTS_BOX_HEIGHT - 40;

const NewsEventsStyle = styled.div`
  .news-and-events-content {
    color: ${COLORS.WHITE};
    font-family: ${FONT_FAMILIES.ARIAL};
    font-size: 12px;
    padding: 1em;
    background-color: ${LOGICAL_COLORS.CT_PRIMARY};
    width: 300px;
    height: ${NEWS_AND_EVENTS_BOX_HEIGHT}px;

    .truncated-news {
      position: relative;
    }

    .fade-mask {
      height: 24px;
      background: linear-gradient(
        ${LOGICAL_COLORS.CT_PRIMARY}00,
        ${LOGICAL_COLORS.CT_PRIMARY}FF
      );
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .truncated-news {
      height: ${MAX_NEWS_DISPLAY_HEIGHT}px;
      overflow-y: hidden;
    }

    .news-item {
      margin-bottom: 2em;
    }

    position: relative;
  }

  a {
    color: ${COLORS.WHITE};
  }

  h3 {
    color: ${COLORS.WHITE};
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 6px;
  }

  .date-and-time {
    font-style: italic;
    margin-left: 4em;
  }

  .more-news-link {
    color: white;
    display: block;
    font-size: 120%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      ${LOGICAL_COLORS.CT_PRIMARY}00,
      ${LOGICAL_COLORS.CT_PRIMARY}FF 24px,
      ${LOGICAL_COLORS.CT_PRIMARY}
    );
    text-align: center;
    padding: 30px 0 1em 0;
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
  color: ${COLORS.WHITE};
  display: inline-block;
  padding: 1em;
  ${({selected}) =>
    selected
      ? `background-color: ${LOGICAL_COLORS.CT_PRIMARY};`
      : `background-color: ${LOGICAL_COLORS.CT_SECOND};`}

  &:hover {
    text-decoration: underline;
  }
`;

function renderNews(news, showNewsLink) {
  const newsItems = news.map((newsItem, index) => {
    const {linkPath, text} = newsItem;
    return (
      <div className="news-item" key={index}>
        <h3>{linkPath ? <Link to={linkPath}>{text}</Link> : text}</h3>
      </div>
    );
  });

  return (
    <>
      <div className={showNewsLink ? 'truncated-news' : null} id="news-items">
        {newsItems}
        {showNewsLink && <div className="fade-mask" />}
      </div>
      {showNewsLink && (
        <Link className="more-link" to={routePaths.MAIN_NEWS}>
          More News
        </Link>
      )}
    </>
  );
}

function renderEventsList(events) {
  return events.reduce((displayItems, event, index) => {
    const {dateString, linkPath, title, timeStart} = event;

    const to = linkPath ?? {
      pathname: routePaths.CE_CALENDAR_DAY,
      state: {selectedDay: dateString}
    };

    const jsDate = parseISO(dateString);
    const jsTimeStart = parseISO(timeStart);
    const formattedTimeStart = timeStart && format(jsTimeStart, ' @ h:mm aaaa');

    displayItems.push(
      <div className="news-item" key={index}>
        <Link to={to}>
          <h3>{title}</h3>
          <div className="date-and-time">
            {format(jsDate, 'cccc, LLLL d')} {timeStart && formattedTimeStart}
          </div>
        </Link>
      </div>
    );

    return displayItems;
  }, []);
}

function renderEvents(events) {
  const numberofEventsToDisplay = 3;
  const displayedEvents = events.slice(0, numberofEventsToDisplay);

  const eventsAreTruncated = displayedEvents.length !== events.length;

  return (
    <>
      {renderEventsList(displayedEvents)}
      {eventsAreTruncated && (
        <Link className="more-link" to={routePaths.MAIN_CALENDAR_UPCOMING}>
          More Events
        </Link>
      )}
    </>
  );
}

const NewsAndEvents = () => {
  const NEWS_DISPLAY = 'news-content';
  const EVENTS_DISPLAY = 'events-display';
  const [displayType, setDisplayType] = useState(NEWS_DISPLAY);
  const [showNewsLink, setShowNewsLink] = useState(false);

  const events = useFirebaseEvents({
    futureOnly: true,
    returnAsArray: true
  });

  const news = useNews();

  useEffect(() => {
    const newsAndEventsContentHeight = document?.getElementById('news-items')
      ?.offsetHeight;

    if (newsAndEventsContentHeight > MAX_NEWS_DISPLAY_HEIGHT) {
      setShowNewsLink(true);
    }
  }, []);

  return (
    <NewsEventsStyle>
      <div className="news-and-events-content">
        {displayType === NEWS_DISPLAY
          ? renderNews(news, showNewsLink)
          : renderEvents(events)}
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
