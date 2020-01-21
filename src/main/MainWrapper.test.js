import React from 'react';
import {shallow} from 'enzyme';
import MainWrapper from './MainWrapper';

describe('MainWrapper', () => {
  it('renders', () => {
    expect(shallow(<MainWrapper />).exists()).toBe(true);
  });
});
