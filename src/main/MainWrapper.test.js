import React from 'react';
import {shallow} from 'enzyme';
import MainWrapper from './MainWrapper';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<MainWrapper />).exists()).toBe(true);
  });

  it('renders menu bar', () => {
    const wrapper = shallow(<MainWrapper />);

    expect(wrapper.find('MainMenubar').exists()).toBe(true);
  });
});
