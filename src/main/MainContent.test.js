import React from 'react';
import {shallow} from 'enzyme';
import MainContent from './MainContent';

describe('MainContent', () => {
  it('renders', () => {
    expect(shallow(<MainContent />).exists()).toBe(true);
  });

  it('renders slideshow', () => {
    const wrapper = shallow(<MainContent />);

    expect(wrapper.find('Slider').exists()).toBe(true);
  });

  it('renders stream div', () => {
    const wrapper = shallow(<MainContent />);

    expect(wrapper.find('.stream-services').exists()).toBe(true);
  });

  // it('renders outreach div', () => {
  //   const wrapper = shallow(<MainContent />);

  //   expect(wrapper.find('.outreach-services').exists()).toBe(true);
  // });

  // it('renders grow with us div', () => {
  //   const wrapper = shallow(<MainContent />);

  //   expect(wrapper.find('.grow-with-us').exists()).toBe(true);
  // });

  // it('renders calendar link', () => {
  //   const wrapper = shallow(<MainContent />);

  //   expect(wrapper.find('.calendar-link').exists()).toBe(true);
  // });

  // it('renders daily devotional link', () => {
  //   const wrapper = shallow(<MainContent />);

  //   expect(wrapper.find('.daily-devotional').exists()).toBe(true);
  // });

  // it('renders upcoming events', () => {
  //   const wrapper = shallow(<MainContent />);

  //   expect(wrapper.find('.upcoming-events').exists()).toBe(true);
  // });
});
