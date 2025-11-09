import moment from 'moment';
import {Component} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import routePaths from '../routePaths';

import CalendarDay from './Calendar/CalendarDay';
import CalendarMenuBar from './Calendar/CalendarMenuBar';
import CalendarMonth from './Calendar/CalendarMonth';
import CalendarUpcoming from './Calendar/CalendarUpcoming';
import CalendarWeek from './Calendar/CalendarWeek';
import CalendarYear from './Calendar/CalendarYear';
import MainMenubar from './commonComponents/MainMenubar';

const CalendarPageStyles = styled.div`
  --calendar-other-month-content: rgb(200, 200, 200);
  --calendar-selected-area: var(--accented-background);
  --calendar-has-events: var(--accent-background-2);

  background-color: var(--light-background);
  color: var(--black);
  min-height: 100%;
  padding-bottom: var(--page-bottom-padding);

  .calendar-page-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1em;
    padding: 0 var(--gutter-space);

    h1 {
      font-weight: normal;
      margin-top: 0;
      text-transform: uppercase;
    }
  }
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment(),
    };
  }

  render() {
    const linkData = [
      {path: routePaths.MAIN_CALENDAR_DAY, text: 'Day View'},
      {path: routePaths.MAIN_CALENDAR_WEEK, text: 'Week View'},
      {path: routePaths.MAIN_CALENDAR_MONTH, text: 'Month View'},
      {path: routePaths.MAIN_CALENDAR_YEAR, text: 'Year View'},
      {path: routePaths.MAIN_CALENDAR_UPCOMING, text: 'Upcoming'},
    ];

    return (
      <CalendarPageStyles>
        <MainMenubar imageSource={choir} />
        <div className="calendar-page-content">
          <h1>Events at City Temple</h1>
          <CalendarMenuBar id="calendar-menu" links={linkData} />
          <Routes>
            <Route
              element={<Navigate to={routePaths.MAIN_CALENDAR_MONTH} />}
              path="/"
            />
            <Route
              element={<CalendarMonth />}
              path={routePaths.MAIN_CALENDAR_MONTH}
            />
            <Route
              element={<CalendarDay />}
              path={routePaths.MAIN_CALENDAR_DAY}
            />
            <Route
              element={<CalendarWeek />}
              path={routePaths.MAIN_CALENDAR_WEEK}
            />
            <Route
              element={<CalendarYear />}
              path={routePaths.MAIN_CALENDAR_YEAR}
            />
            <Route
              element={<CalendarUpcoming />}
              path={routePaths.MAIN_CALENDAR_UPCOMING}
            />
          </Routes>
        </div>
      </CalendarPageStyles>
    );
  }
}

export default Calendar;
