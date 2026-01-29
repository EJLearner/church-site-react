import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Temporal as TemporalPolyFill} from 'temporal-polyfill';

import Admin from './main/Admin/Admin';
import MainWrapper from './main/MainWrapper';
import PastorApplicationPage from './main/PastorApplicationPage';
import RemovedPage from './main/RemovedPage';
import ScrollToTop from './main/commonComponents/ScrollToTop';
import routePaths from './routePaths';
import {isBetween} from './utils/dateTimeUtils';

const TopRoutes = () => {
  const showPastorApplicationPage = isBetween(
    TemporalPolyFill.Now.plainDateISO().toString(),
    '2026-02-01',
    '2026-03-03',
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainWrapper />} path="/*" />
        <Route element={<RemovedPage />} path="/ce/" />
        <Route element={<Admin />} path={`${routePaths.ADMIN}/*`} />
        {showPastorApplicationPage && (
          <Route
            element={<PastorApplicationPage />}
            path={routePaths.PASTOR_APPLICATION}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default TopRoutes;
