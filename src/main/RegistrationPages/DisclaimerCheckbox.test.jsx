import {render} from '@testing-library/react';
import {beforeEach, describe, it, vi} from 'vitest';

import DisclaimerCheckbox from './DisclaimerCheckbox';

describe('DisclaimerCheckbox', () => {
  let props;

  beforeEach(() => {
    props = {
      checked: false,
      id: 'test-disclaimer-checkbox',
      onChange: vi.fn(),
    };
  });

  it('renders', () => {
    render(<DisclaimerCheckbox {...props} />);
  });
});
