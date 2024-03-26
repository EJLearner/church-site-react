import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import TopRoutes from './TopRoutes';
import VbsCheckin from './main/CcVbsCheckinOut/VbsCheckin';
import routePaths from './routePaths';

describe('TopRoutes', () => {
  it('loads correctly', () => {
    expect(() => render(<TopRoutes />)).not.toThrow();
  });

  it('loads VbsCheckin correctly', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={[routePaths.CE_VBS_CHECKIN]}>
        <TopRoutes />
      </MemoryRouter>,
    );

    expect(wrapper.find(VbsCheckin).exists()).toBeTrue;
  });
});
