import React from 'react';
import {shallow} from 'enzyme';
import MainMenubar from './MainMenubar';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<MainMenubar />).exists()).toBe(true);
  });
});
