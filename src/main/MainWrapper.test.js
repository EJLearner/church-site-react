
import {shallow} from 'enzyme';
import React from 'react';

import MainWrapper from './MainWrapper';

describe('MainWrapper', () => {
  it('renders', () => {
    expect(shallow(<MainWrapper />).exists()).toBe(true);
  });
});
