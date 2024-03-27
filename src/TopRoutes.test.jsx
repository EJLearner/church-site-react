import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {expect, it, describe} from 'vitest';

import TopRoutes from './TopRoutes';
import routePaths from './routePaths';

describe('TopRoutes', () => {
  it('loads correctly', () => {
    expect(() => render(<TopRoutes />)).not.toThrow();
  });

  it('loads VbsCheckin correctly', () => {
    render(
      <MemoryRouter initialEntries={[routePaths.CE_VBS_CHECKIN]}>
        <TopRoutes />
      </MemoryRouter>,
    );
  });
});
