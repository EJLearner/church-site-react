import {render} from '@testing-library/react';
import {beforeEach, describe, it} from 'vitest';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';

describe('BaseRegistrationVolunteer', () => {
  let props;
  beforeEach(() => {
    props = {
      refName: 'test-refname',
      volunteerIdPropName: 'volunteer',
    };
  });

  it('renders', () => {
    render(<BaseRegistrationVolunteer {...props} />);
  });
});
