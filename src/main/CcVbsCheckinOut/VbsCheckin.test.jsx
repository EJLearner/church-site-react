import {render} from '@testing-library/react';
import {describe, it} from 'vitest';

import VbsCheckin from './VbsCheckin';

describe('#render', () => {
  it('renders', () => {
    render(<VbsCheckin />);
  });
});
