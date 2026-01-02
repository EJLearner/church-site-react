import {render} from '@testing-library/react';
import {describe, it, vi} from 'vitest';

import CcRegistrationChild from './CcRegistrationChild';

vi.mock('../../utils/commonUtils.js');

describe('CcRegistrationChild', () => {
  it('renders BaseCcRegistrationChild', () => {
    render(<CcRegistrationChild />);
  });
});
