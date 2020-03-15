import React, {Component} from 'react';

import moment from 'moment';

import routePaths from '../../../routePaths';

import CalendarDay from './DeprecatedCalendarDay';
import CalendarMonth from './DeprecatedCalendarMonth';
import CalendarWeek from './DeprecatedCalendarWeek';
import CalendarYear from './DeprecatedCalendarYear';
import CalendarUpcoming from './DeprecatedCalendarUpcoming';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';
import Quote from '../Quote/Quote';
import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';
import TitleBar from '../TitleBar/TitleBar';

import './Calendar.css';

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
        render: <CalendarDay />,
        text: 'Day View'
      },
      {
        path: routePaths.CE_CALENDAR_WEEK,
        render: <CalendarWeek />,
        text: 'Week View'
      },
      {
        isDefault: true,
        path: routePaths.CE_CALENDAR_MONTH,
        render: <CalendarMonth />,
        text: 'Month View'
      },
      {
        path: routePaths.CE_CALENDAR_YEAR,
        render: <CalendarYear />,
        text: 'Year View'
      },
      {
        path: routePaths.CE_CALENDAR_UPCOMING,
        render: <CalendarUpcoming />,
        text: 'Upcoming'
      }
    ];

    return (
      <div id="top-react-div">
        <TitleBar />
        <div className="calendar-page">
          <h1>Events at City Temple</h1>
          <MenuBar
            addDivToRight
            id="calendar-menu"
            links={linkData}
            showLogo={false}
          />
          <SubPageSwitch linkData={linkData} />
        </div>
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default Calendar;
