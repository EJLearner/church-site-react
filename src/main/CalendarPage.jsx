import moment from 'moment';
import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import routePaths from '../routePaths';

import CalendarStyles from './CalendarStyles';
import CalendarDay from './commonComponents/Calendar/CalendarDay';
import CalendarMenuBar from './commonComponents/Calendar/CalendarMenuBar';
import CalendarMonth from './commonComponents/Calendar/CalendarMonth';
import CalendarUpcoming from './commonComponents/Calendar/CalendarUpcoming';
import CalendarWeek from './commonComponents/Calendar/CalendarWeek';
import CalendarYear from './commonComponents/Calendar/CalendarYear';

// TODO BR -

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment()
    };
  }

  render() {
    const linkData = [
      {
        path: routePaths.MAIN_CALENDAR_DAY,
        text: 'Day View'
      },
      {
        path: routePaths.MAIN_CALENDAR_WEEK,
        text: 'Week View'
      },
      {
        path: routePaths.MAIN_CALENDAR_MONTH,
        text: 'Month View'
      },
      {
        path: routePaths.MAIN_CALENDAR_YEAR,
        text: 'Year View'
      },
      {
        path: routePaths.MAIN_CALENDAR_UPCOMING,
        text: 'Upcoming'
      }
    ];

    return (
      <CalendarStyles>
        <div className="calendar-page">
          <h1>Events at City Temple</h1>
          <CalendarMenuBar id="calendar-menu" links={linkData} />
          <Switch>
            <Route path={routePaths.MAIN_CALENDAR_MONTH}>
              <CalendarMonth />
            </Route>
            <Route path={routePaths.MAIN_CALENDAR_DAY}>
              <CalendarDay />
            </Route>
            <Route path={routePaths.MAIN_CALENDAR_WEEK}>
              <CalendarWeek />
            </Route>
            <Route path={routePaths.MAIN_CALENDAR_YEAR}>
              <CalendarYear />
            </Route>
            <Route path={routePaths.MAIN_CALENDAR_UPCOMING}>
              <CalendarUpcoming />
            </Route>
            <Route
              exact
              path={routePaths.MAIN_CALENDAR}
              render={() => <Redirect to={routePaths.MAIN_CALENDAR_MONTH} />}
            />
          </Switch>
        </div>
      </CalendarStyles>
    );
  }
}

export default Calendar;
