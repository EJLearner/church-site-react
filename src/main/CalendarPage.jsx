import React, {Component} from 'react';

import moment from 'moment';

import CalendarStyles from './CalendarStyles';
import MainMenubar from './MainMenubar';
import CalendarMenuBar from './commonComponents/Calendar/CalendarMenuBar';
import routePaths from '../routePaths';

// import CalendarDay from './CalendarDay';
// import CalendarMonth from './CalendarMonth';
// import CalendarWeek from './CalendarWeek';
// import CalendarYear from './CalendarYear';
// import CalendarUpcoming from './CalendarUpcoming';
// import MenuBar from '../MenuBar/MenuBar';
// import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';

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
        path: routePaths.CE_CALENDAR_DAY,
        text: 'Day View'
      },
      {
        path: routePaths.CE_CALENDAR_WEEK,
        text: 'Week View'
      },
      {
        isDefault: true,
        path: routePaths.CE_CALENDAR_MONTH,
        text: 'Month View'
      },
      {
        path: routePaths.CE_CALENDAR_YEAR,
        text: 'Year View'
      },
      {
        path: routePaths.CE_CALENDAR_UPCOMING,
        text: 'Upcoming'
      }
    ];

    return (
      <CalendarStyles id="top-react-div">
        <MainMenubar />
        <div className="calendar-page">
          <h1>Events at City Temple</h1>
          <CalendarMenuBar id="calendar-menu" links={linkData} />
          {/* <SubPageSwitch linkData={linkData} /> */}
        </div>
      </CalendarStyles>
    );
  }
}

export default Calendar;
