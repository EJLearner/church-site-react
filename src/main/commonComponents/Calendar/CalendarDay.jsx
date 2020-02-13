import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import moment from 'moment';

import EventsListPage from './EventsListPage';
import withDatesSubscription from '../../../ce/components/Hocs/withDatesSubscription';

class CalendarDay extends Component {
  constructor(props) {
    super(props);

    const dayFromRouter = this.props.location?.state?.selectedDay;

    this.state = {selectedDay: dayFromRouter || moment().format('YYYY-MM-DD')};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDay !== this.props.selectedDay) {
      this.setState({selectedDay: this.props.selectedDay});
    }
  }

  onDateChange(dayString) {
    this.setState({selectedDay: dayString});
  }

  render() {
    const currentDayMoment = moment();
    const selectedDayMoment = moment(this.state.selectedDay, 'YYYY-MM-DD');

    const currentDaySelected = selectedDayMoment.isSame(
      currentDayMoment,
      'day'
    );

    const pageTitle = currentDaySelected
      ? 'Today’s Events'
      : `Events for ${selectedDayMoment.format('MMMM DD, YYYY')}`;

    return (
      <EventsListPage
        dates={[this.state.selectedDay]}
        onDateChange={dayString => this.onDateChange(dayString)}
        pageTitle={pageTitle}
        selectedDay={this.state.selectedDay}
        storedDates={this.props.storedDates}
      />
    );
  }
}

CalendarDay.propTypes = {
  location: PropTypes.object.isRequired,
  selectedDay: PropTypes.string,
  storedDates: PropTypes.object
};

CalendarDay.defaultProps = {
  selectedDay: moment().format('YYYY-MM-DD')
};

export default withRouter(withDatesSubscription(CalendarDay));
