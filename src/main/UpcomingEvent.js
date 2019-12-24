import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './UpcomingEvent.css';

UpcomingEvent.propTypes = {
  date: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

function UpcomingEvent(props) {
  function renderLines(lines) {
    return lines.map((line, index) => (
      <div className="event-line" key={index}>
        {line}
      </div>
    ));
  }

  return (
    <div className="event-area">
      <div className="event-date-container">
        <p>
          {moment(props.date).format('MMM.')}
          <br />
          {moment(props.date).format('D')}
        </p>
      </div>
      <div className="event-title">{props.title}</div>
      <div className="event-lines">{renderLines(props.lines)}</div>
    </div>
  );
}

export default UpcomingEvent;
