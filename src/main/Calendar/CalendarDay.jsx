import moment from 'moment';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

import EventsListPage from './EventsListPage';
import withDatesSubscription from './withDatesSubscription';

const CalendarDay = (props) => {
  const location = useLocation();
  const {storedDates} = props;
  const [selectedDay, setSelectedDay] = useState(location.state?.selectedDay);

  console.log({stateDay: location.state?.selectedDay});

  const onDateChange = (dayString) => {
    setSelectedDay(dayString);
  };

  const currentDayMoment = moment();
  const selectedDayMoment = moment(selectedDay, 'YYYY-MM-DD');
  const currentDaySelected = selectedDayMoment.isSame(currentDayMoment, 'day');
  const pageTitle = currentDaySelected
    ? 'Today’s Events'
    : `Events for ${selectedDayMoment.format('MMMM DD, YYYY')}`;

  return (
    <EventsListPage
      dates={[selectedDay]}
      emptyMessage="No events listed for this date"
      onDateChange={onDateChange}
      pageTitle={pageTitle}
      selectedDay={selectedDay}
      storedDates={storedDates}
    />
  );
};

CalendarDay.propTypes = {
  selectedDay: PropTypes.string,
  storedDates: PropTypes.object,
};

CalendarDay.defaultProps = {
  selectedDay: moment().format('YYYY-MM-DD'),
};

export default withDatesSubscription(CalendarDay);
