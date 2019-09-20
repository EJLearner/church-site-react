import React from 'react';
import {shallow} from 'enzyme';
import MainFooter from './MainFooter';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<MainFooter />).exists()).toBe(true);
  });
});
