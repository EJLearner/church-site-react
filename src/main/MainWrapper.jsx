import {Navigate, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../routePaths';
import GlobalStoreWrapper from '../stores/GlobalStoreWrapper';

import Calendar from './CalendarPage';
import ChristianEducationPage from './ChristianEducationPage';
import ContactPage from './ContactPage';
import GivingPage from './GivingPage';
import HomePage from './HomePage';
import MeditationsPage from './MeditationsPage';
import ProfilePage from './ProfilePage';
import ChildrensSundaySchool from './RegistrationPages/ChildrensSundaySchool';
import WatchPage from './WatchPage';
import NotFound from './commonComponents/NotFound';

const StyledMainWrapperDiv = styled.div`
  height: 100%;
`;

function MainWrapper() {
  return (
    <GlobalStoreWrapper>
      <StyledMainWrapperDiv>
        <Routes>
          {/* Page name and route changed from "About Us" to "Profile" */}
          <Route
            element={<Navigate replace to={`/${routePaths.MAIN_PROFILE}`} />}
            path={routePaths.MAIN_ABOUT_US}
          />
          <Route element={<ProfilePage />} path={routePaths.MAIN_PROFILE} />
          <Route
            element={<Calendar />}
            path={`${routePaths.MAIN_CALENDAR}/*`}
          />
          <Route element={<ContactPage />} path={routePaths.MAIN_CONTACT} />
          {/* Page name and route changed from "Bible Study" to "Christian Education" */}
          <Route
            element={
              <Navigate
                replace
                to={`/${routePaths.MAIN_CHRISTIAN_EDUCATION}`}
              />
            }
            path={routePaths.BIBLE_STUDY}
          />
          <Route
            element={<ChristianEducationPage />}
            path={routePaths.MAIN_CHRISTIAN_EDUCATION}
          />
          <Route element={<GivingPage />} path={routePaths.MAIN_GIVING} />
          <Route element={<HomePage />} path={`${routePaths.MAIN_HOME}/*`} />
          <Route
            element={<MeditationsPage />}
            path={routePaths.MAIN_MEDITATIONS}
          />
          <Route
            element={<ChildrensSundaySchool />}
            path={routePaths.MAIN_SUNDAY_SCHOOL}
          />
          <Route element={<WatchPage />} path={routePaths.MAIN_WATCH} />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </StyledMainWrapperDiv>
    </GlobalStoreWrapper>
  );
}

export default MainWrapper;
