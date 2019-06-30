import CcRegistrationLanding from './CcRegistrationLanding';
import {shallow} from 'enzyme';
import React from 'react';

describe('CcRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => shallow(<CcRegistrationLanding />)).not.toThrow();
  });
});
