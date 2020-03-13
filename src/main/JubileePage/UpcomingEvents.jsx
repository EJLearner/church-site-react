import React from 'react';
import PropTypes from 'prop-types';

function renderDate(title, timeStart, date, index) {
  return (
    <div key={index}>
      {date}
      {title}
      {timeStart}
    </div>
  );
}

function UpcomingEvents(props) {
  return props.orderedEvents.reduce((render, event, index, orderedEvents) => {
    const {date, title, timeStart} = event;

    const monthNumber = date.substring(5, 7);
    const lastMonthNumber =
      index && orderedEvents[index - 1].date.substring(5, 7);
    const monthChanged = monthNumber !== lastMonthNumber;
    console.log('UpcomingEvents -> monthChanged', monthChanged);

    if (monthChanged) {
      const monthName = console.log('now month', monthNumber);
    }

    render.push(renderDate(date, title, timeStart, index));

    return render;
  }, []);
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
