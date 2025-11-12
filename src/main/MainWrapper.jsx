import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../routePaths';
import GlobalStoreWrapper from '../stores/GlobalStoreWrapper';

import AboutUsPage from './AboutUsPage';
import BibleStudyPage from './BibleStudyPage';
import Calendar from './CalendarPage';
import ContactPage from './ContactPage';
import GivingPage from './GivingPage';
import HomePage from './HomePage';
import MeditationsPage from './MeditationsPage';
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
          <Route element={<AboutUsPage />} path={routePaths.MAIN_ABOUT_US} />
          <Route
            element={<Calendar />}
            path={`${routePaths.MAIN_CALENDAR}/*`}
          />
          <Route element={<ContactPage />} path={routePaths.MAIN_CONTACT} />
          <Route element={<BibleStudyPage />} path={routePaths.BIBLE_STUDY} />
          <Route element={<GivingPage />} path={routePaths.MAIN_GIVING} />
          <Route element={<HomePage />} path={`${routePaths.MAIN_HOME}/*`} />
          <Route
            element={<MeditationsPage />}
            path={routePaths.MAIN_MEDITATIONS}
          />

          <Route element={<WatchPage />} path={routePaths.MAIN_WATCH} />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </StyledMainWrapperDiv>
    </GlobalStoreWrapper>
  );
}

export default MainWrapper;
