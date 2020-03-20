import MainWrapper from './MainWrapper';

import {shallow} from 'enzyme';
import React from 'react';

describe('MainWrapper', () => {
  it('renders', () => {
    expect(shallow(<MainWrapper />).exists()).toBe(true);
  });
});
