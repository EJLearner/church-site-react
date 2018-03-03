import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import moment from 'moment';

import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek';
import CalendarYear from './CalendarYear';
import CalendarUpcoming from './CalendarUpcoming';
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
    const makeRoutes = linkData => {
      const routes = [];
      linkData.forEach(route => {
        routes.push(
          <Route
            key={route.path}
            path={route.path}
            render={() => route.render}
          />
        );

        if (route.children) {
          routes.push(...makeRoutes(route.children));
        }
      });

      const defaultRoute = linkData.find(route => route.isDefault);
      if (defaultRoute) {
        routes.push(
          <Route key={'defaultRoute'} render={() => defaultRoute.render} />
        );
      }

      return routes;
    };

    const linkData = [
      {
        path: '/calendar/day',
        render: <CalendarDay />,
        text: 'Day View'
      },
      {
        path: '/calendar/week',
        render: <CalendarWeek />,
        text: `Week View`
      },
      {
        isDefault: true,
        path: '/calendar/month',
        render: <CalendarMonth />,
        text: `Month View`
      },
      {
        path: '/calendar/year',
        render: <CalendarYear />,
        text: 'Year View'
      },
      {
        path: '/calendar/upcoming',
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
