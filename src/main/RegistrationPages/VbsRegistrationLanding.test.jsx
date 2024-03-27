import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

import VbsRegistrationLanding from './VbsRegistrationLanding';

describe('VbsRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => render(<VbsRegistrationLanding />).not.toThrow());
  });
});
