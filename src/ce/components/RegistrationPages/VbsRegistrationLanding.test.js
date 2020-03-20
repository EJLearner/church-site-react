import VbsRegistrationLanding from './VbsRegistrationLanding';

import {shallow} from 'enzyme';
import React from 'react';

describe('VbsRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => shallow(<VbsRegistrationLanding />)).not.toThrow();
  });
});
