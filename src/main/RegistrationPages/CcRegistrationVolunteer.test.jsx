import {render} from '@testing-library/react';
import {describe, it, vi} from 'vitest';

import CcRegistrationVolunteer from './CcRegistrationVolunteer';

vi.mock('../../utils/commonUtils.js');

describe('CcRegistrationVolunteer', () => {
  it('renders ', () => {
    render(<CcRegistrationVolunteer />);
  });
});
