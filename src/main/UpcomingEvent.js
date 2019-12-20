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
      <div className="other-line" key={index}>
        {line}
      </div>
    ));
  }

  return (
    <div className="event-area">
      <div className="event-date">
        {moment(props.date).format('MMM.')}
        <br />
        {moment(props.date).format('D')}
      </div>
      <div className="event-title">{props.title}</div>
      <div className="other-lines">{renderLines(props.lines)}</div>
    </div>
  );
}

export default UpcomingEvent;
