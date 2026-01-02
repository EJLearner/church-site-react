import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Admin from './main/Admin/Admin';
import MainWrapper from './main/MainWrapper';
import PastorApplicationPage from './main/PastorApplicationPage';
import RemovedPage from './main/RemovedPage';
import ScrollToTop from './main/commonComponents/ScrollToTop';
import routePaths from './routePaths';

const TopRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainWrapper />} path="/*" />
        <Route element={<RemovedPage />} path="/ce/" />
        <Route element={<Admin />} path={`${routePaths.ADMIN  }/*`} />
        <Route
          element={<PastorApplicationPage />}
          path={routePaths.PASTOR_APPLICATION}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default TopRoutes;
