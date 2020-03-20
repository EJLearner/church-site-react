import MainPage from '.';

import {shallow} from 'enzyme';
import React from 'react';

describe('MainPage', () => {
  it('renders', () => {
    expect(shallow(<MainPage />).exists()).toBe(true);
  });
});
