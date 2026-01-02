import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import CcRegistrationLanding from './CcRegistrationLanding';

describe('CcRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => render(<CcRegistrationLanding />)).not.toThrow();
  });
});
