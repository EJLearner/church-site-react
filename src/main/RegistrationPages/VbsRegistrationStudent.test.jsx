import {render} from '@testing-library/react';
import {beforeEach, describe, it, vi} from 'vitest';

import VbsRegistrationStudent, {STUDENT_TYPES} from './VbsRegistrationStudent';
vi.mock('../../utils/commonUtils.js');

describe('VbsRegistrationStudent', () => {
  let props;

  beforeEach(() => {
    props = {
      studentType: STUDENT_TYPES.ADULT,
    };
  });

  it('renders', () => {
    render(<VbsRegistrationStudent {...props} />);
  });
});
