import React from 'react';
import ReactDOM from 'react-dom';

import {mount, shallow} from 'enzyme';

import Slider from './Slider';
import {MemoryRouter} from 'react-router';

describe('#render', () => {
  it('renders with proper class and id', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    const outerDiv = wrapper.find('#leftcontent');

    expect(outerDiv.props().className).toBe('slider-chris');
    expect(outerDiv.props().id).toBe('leftcontent');
  });

  it('makes _sliderDiv as ref to self', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    ).find(Slider);

    expect(wrapper.instance()._sliderDiv.id).toEqual('leftcontent');
  });

  it('renders _renderSlideShowButtons if there is more than one picture', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    const SlideShowButtons = wrapper.instance()._renderSlideShowButtons;

    expect(wrapper.instance().allPictures.length).toBeGreaterThan(1);
    expect(wrapper.find(SlideShowButtons).exists()).toBeTruthy();
  });

  it('does not render _renderSlideShowButtons if there is one picture', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    wrapper.instance().pictures = [wrapper.instance().pictures[0]];
    wrapper.update();

    const SlideShowButtons = wrapper.instance()._renderSlideShowButtons;

    expect(wrapper.find(SlideShowButtons).exists()).toBeFalsy();
  });
});
