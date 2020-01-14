import React from 'react';
import {shallow} from 'enzyme';
import MainPage from '.';

describe('MainPage', () => {
  it('renders', () => {
    expect(shallow(<MainPage />).exists()).toBe(true);
  });
});
