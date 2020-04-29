import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';

const EventsWrapper = styled.div`
  h3 {
    background-color: ${LOGICAL_COLORS.CT_PRIMARY};
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
    border: 3px solid ${LOGICAL_COLORS.CT_PRIMARY};
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
      background-color: ${LOGICAL_COLORS.CT_PRIMARY};
    }

    .date-square-date {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
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

const orderedEvents = [
  {
    date: '2020-03-15',
    title: 'Recognition of Rev. William Payne, Pastor Emeritus',
    time: '9 am'
  },
  {
    date: '2020-03-28',
    title: '5K Memorial Walk',
    time: '9 am'
  },
  {
    date: '2020-05-24',
    title: 'Recognition of Our Deceased Loved Ones',
    time: '9 am'
  },
  {
    date: '2020-06-14',
    title: 'Gospel Ensemble & Men’s Choir Concert',
    time: '4 pm'
  },
  {
    date: '2020-11-06',
    title: '50th Anniversary Jubilee Banquet',
    time: '6 pm'
  }
];

function renderDate(title, jsDate, time, index) {
  return (
    <div key={index}>
      <div className="date-square">
        <div className="date-square-month">{format(jsDate, 'MMM')}</div>
        <div className="date-square-date">{format(jsDate, 'd')}</div>
      </div>
      <div className="title-and-name">
        <div className="event-title">{title}</div>
        {time && <div className="event-time">{time}</div>}
      </div>
    </div>
  );
}

function eventsRenders(orderedEvents) {
  return orderedEvents.reduce((render, event, index, orderedEvents) => {
    const {date, title, time} = event;
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

    render.push(renderDate(title, jsDate, time, index));

    return render;
  }, []);
}

function UpcomingEvents(props) {
  const renderedEvents = eventsRenders(orderedEvents);

  return <EventsWrapper>{renderedEvents}</EventsWrapper>;
}

export default UpcomingEvents;
