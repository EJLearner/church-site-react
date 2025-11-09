import {render} from '@testing-library/react';
import {expect, it, describe} from 'vitest';

import TopRoutes from './TopRoutes';
import routePaths from './routePaths';

describe('TopRoutes', () => {
  it('loads correctly', () => {
    expect(() => render(<TopRoutes />)).not.toThrow();
  });

  it('loads VbsCheckin correctly', () => {
    window.history.pushState(null, '', routePaths.CE_VBS_CHECKIN);

    render(<TopRoutes />);
  });
});
