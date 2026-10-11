import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import Admin from './main/Admin/Admin';
import MainWrapper from './main/MainWrapper';
import PastorApplicationPage from './main/PastorApplicationPage';
import RemovedPage from './main/RemovedPage';
import ScrollToTop from './main/commonComponents/ScrollToTop';
import routePaths from './routePaths';
import commonUtils from './utils/commonUtils';

const TopRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainWrapper />} path="/*" />
        <Route element={<RemovedPage />} path="/ce/" />
        <Route element={<Admin />} path={`${routePaths.ADMIN}/*`} />
        {commonUtils.isAcceptingApplications() && (
          <Route
            element={<PastorApplicationPage />}
            path={routePaths.PASTOR_APPLICATION}
          />
        )}
        {/* Old address for the Sunday School page, in case it was shared */}
        <Route
          element={
            <Navigate replace to={`/${routePaths.MAIN_SUNDAY_SCHOOL}`} />
          }
          path={routePaths.CE_REG_SUNDAY_SCHOOL}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default TopRoutes;
