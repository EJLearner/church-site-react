import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const EventsWrapper = styled.div`
  h3 {
    background-color: ${LOGICAL_COLORS.CT_ACCENT};
    color: white;
    font-size: 2em;
    margin-bottom: 1em;
    padding: 1em;

    .year {
      font-weight: bold;
    }
  }

  & > div {
    display: inline-flex;
    margin-bottom: 1em;
  }

  .date-square {
    display: inline-block;
    border: 3px solid ${LOGICAL_COLORS.CT_ACCENT};
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    width: 60px;
    height: 60px;

    & > div {
      align-items: center;
      display: flex;
      height: 50%;
      justify-content: center;
    }

    .date-square-month {
      display: flex;
      color: white;
      background-color: ${LOGICAL_COLORS.CT_ACCENT};
    }
  }

  .title-and-name {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5em 1em;

    .event-title {
      font-weight: bold;
    }
  }
`;

function renderDate(title, jsDate, timeStart, index) {
  const jsStartTime = parseISO(timeStart);

  const time = timeStart && format(jsStartTime, 'h bbbb').replace(/\./g, '');

  return (
    <div key={index}>
      <div className="date-square">
        <div className="date-square-month">{format(jsDate, 'MMM')}</div>
        <div className="date-square-date">{format(jsDate, 'd')}</div>
      </div>
      <div className="title-and-name">
        <div className="event-title">{title}</div>
        <div className="event-time">{time}</div>
      </div>
    </div>
  );
}

function eventsRenders(orderedEvents) {
  return orderedEvents.reduce((render, event, index, orderedEvents) => {
    const {date, title, timeStart} = event;
    const monthNumber = date.substring(5, 7);
    const lastMonthNumber =
      index && orderedEvents[index - 1].date.substring(5, 7);
    const monthChanged = monthNumber !== lastMonthNumber;

    const jsDate = parseISO(date);

    if (monthChanged) {
      const monthName = format(jsDate, 'MMMM');
      const year = format(jsDate, 'yyyy');
      render.push(
        <h3>
          {monthName} <span className="year">{year}</span>
        </h3>
      );
    }

    render.push(renderDate(title, jsDate, timeStart, index));

    return render;
  }, []);
}

function UpcomingEvents(props) {
  const renderedEvents = eventsRenders(props.orderedEvents);

  return <EventsWrapper>{renderedEvents}</EventsWrapper>;
}

UpcomingEvents.propTypes = {
  orderedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      timeStart: PropTypes.string
    })
  ).isRequired
};

export default UpcomingEvents;
