import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import routePaths from '../../../routePaths';

import moment from 'moment';
import _ from 'lodash';

import './Announcements.css';
import withDatesSubscription from '../Hocs/withDatesSubscription';

class Announcements extends Component {
  getFormattedDaysEvents(dayEvents) {
    const unsortedAnnouncements = _.filter(dayEvents, {isAnnouncement: true});

    const sortedEvents = unsortedAnnouncements.sort((a, b) => {
      const timeStartA = a.timeStart || '';
      const timeStartB = b.timeStart || '';

      // just doing string compare since standard date-time string is used
      if (timeStartA < timeStartB) {
        return -1;
      }

      if (timeStartA > timeStartB) {
        return 1;
      }

      return 0;
    });

    const renderedEvents = _.map(sortedEvents, (event) => {
      let timeStart;
      if (event.timeStart) {
        if (event.followsWorship) {
          timeStart = 'Following the morning worship';
        } else {
          timeStart = moment(event.timeStart).format('H:mm a');
        }
      }

      const timeEnd = event.timeEnd
        ? moment(event.timeEnd).format('H:mm a')
        : undefined;

      return {
        shortDescription: event.shortDescription,
        timeStart,
        timeEnd,
        title: event.title || event
      };
    });

    return renderedEvents;
  }

  getFormattedAnnouncements() {
    const allDates = this.props.storedDates;
    const datesAsArray = _.map(allDates, (dateObject, dateString) => {
      dateObject.date = dateString;
      return dateObject;
    });

    const sortedDates = _.sortBy(datesAsArray, 'date');

    return _.reduce(
      sortedDates,
      (upComingEvents, dayData) => {
        const {date} = dayData;
        const dateMoment = moment(date);
        if (dateMoment.isSameOrAfter(moment(), 'day')) {
          const events = this.getFormattedDaysEvents(dayData.events);

          upComingEvents.push({
            dateString: dateMoment.format('YYYY-MM-DD'),
            displayedDate: dateMoment.format('MMMM, D YYYY'),
            events
          });
        }

        return upComingEvents;
      },
      []
    );
  }

  renderedAnnouncements() {
    return this.getFormattedAnnouncements().map((dayData) => {
      const {dateString, displayedDate} = dayData;
      const renderedEvents = dayData.events.map((event) => {
        const {timeEnd, timeStart, title, shortDescription} = event;
        const timeEndString = timeStart && timeEnd ? ` - ${timeEnd}` : '';

        return (
          <div className="event" key={`${displayedDate}-${title}`}>
            <div>
              {timeStart}
              {timeEndString}
            </div>
            <div>{title}</div>
            <div>{shortDescription}</div>
          </div>
        );
      });
      return renderedEvents.length ? (
        <Link
          key={displayedDate}
          to={{
            pathname: routePaths.CE_CALENDAR_DAY,
            state: {selectedDay: dateString}
          }}
        >
          <div className="date">
            <h3>{displayedDate}</h3>
            {renderedEvents}
          </div>
        </Link>
      ) : null;
    });
  }

  render() {
    return (
      <div className="announcements-content">
        {this.renderedAnnouncements()}
      </div>
    );
  }
}

Announcements.propTypes = {
  storedDates: PropTypes.object
};

export default withDatesSubscription(Announcements);
