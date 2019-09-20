import React from 'react';
import {shallow} from 'enzyme';
import MainWrapper from './MainWrapper';

describe('MainWrapper', () => {
  it('renders', () => {
    expect(shallow(<MainWrapper />).exists()).toBe(true);
  });

  it('renders menu bar', () => {
    const wrapper = shallow(<MainWrapper />);

    expect(wrapper.find('MainMenubar').exists()).toBe(true);
  });

  it('renders footer', () => {
    const wrapper = shallow(<MainWrapper />);

    expect(wrapper.find('MainFooter').exists()).toBe(true);
  });
});
