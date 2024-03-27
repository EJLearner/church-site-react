import {render} from '@testing-library/react';
import {beforeEach, describe, it, vi} from 'vitest';

import BaseCcRegistrationChild from './BaseCcRegistrationChild';

vi.mock('./registrationUtils.js');

describe('BaseCcRegistrationChild', () => {
  let props;

  beforeEach(() => {
    vi.mock('./registrationUtils.js');

    props = {
      childIdPropName: 'testId',
      className: 'test-class',
      headerContent: <h1 id="header-content">test-header</h1>,
      refName: 'test-ref-name',
      routePath: '/test/path',
    };
  });

  it('renders', () => {
    render(<BaseCcRegistrationChild {...props} />);
  });
});
