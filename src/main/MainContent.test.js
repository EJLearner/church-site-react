import React from 'react';
import {shallow} from 'enzyme';
import MainContent from './MainContent';

describe('MainContent', () => {
  it('renders', () => {
    expect(shallow(<MainContent />).exists()).toBe(true);
  });
});
