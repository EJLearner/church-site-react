import {shallow} from 'enzyme';
import React from 'react';

import MainPage from '.';

describe('MainPage', () => {
  it('renders', () => {
    expect(shallow(<MainPage />).exists()).toBe(true);
  });
});
