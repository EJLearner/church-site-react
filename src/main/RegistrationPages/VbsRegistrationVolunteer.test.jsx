import {render} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import VbsRegistrationVolunteer from './VbsRegistrationVolunteer';

vi.mock('../../utils/commonUtils.js');

// TODO fix eventually
describe.skip('VbsRegistrationVolunteer', () => {
  it('render BaseRegistrationVolunteer', () => {
    expect(render(<VbsRegistrationVolunteer />)).not.toThrow();
  });
});
