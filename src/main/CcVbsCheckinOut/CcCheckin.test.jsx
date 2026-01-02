import {render} from '@testing-library/react';
import {describe, it} from 'vitest';

import CcCheckin from './CcCheckin';

describe('#render', () => {
  it('renders', () => {
    render(<CcCheckin />);
  });
});
