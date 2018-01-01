import React from 'react';

import {mount, shallow} from 'enzyme';
import slidePictureData from '../../utils/slidePictureData';

import Slider from './Slider';
import {MemoryRouter} from 'react-router';

const pictures = slidePictureData.getPictures();

describe('#constructor', () => {
  beforeEach(() => {
    window.onresize = undefined;
  });

  it('should set the slideIndex state to 0', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={pictures} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    expect(wrapper.state().slideIndex).toBe(0);
  });

  it('should set slideShowIsOn state to true if more than one picture exists', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={pictures} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    expect(wrapper.state().slideShowIsOn).toBe(true);
  });

  it.skip('should call savePictureHeight on window resize', () => {
    expect(window.onresize).toBe(undefined);
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={pictures} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    wrapper.instance().savePictureHeight = jest.fn();
    wrapper.update();

    // window.onresize();

    expect(wrapper.instance().savePictureHeight).toBeCalled();
  });

  it('should set slideShowIsOn state to false if only one picture exists', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={[pictures[0]]} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    expect(wrapper.state().slideShowIsOn).toBe(false);
  });
});

describe('#render', () => {
  it('renders with proper class and id', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={pictures} />
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
        <Slider pictures={pictures} />
      </MemoryRouter>
    ).find(Slider);

    expect(wrapper.instance()._sliderDiv.id).toEqual('leftcontent');
  });

  it('renders _renderSlideShowButtons if there is more than one picture', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={pictures} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    const SlideShowButtons = wrapper.instance()._renderSlideShowButtons;

    expect(pictures.length).toBeGreaterThan(1);
    expect(wrapper.find(SlideShowButtons).exists()).toBeTruthy();
  });

  it('does not render _renderSlideShowButtons if there is one picture', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={[pictures[0]]} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    const SlideShowButtons = wrapper.instance()._renderSlideShowButtons;

    expect(wrapper.find(SlideShowButtons).exists()).toBe(false);
  });

  it('renders SlideShowPictures', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Slider pictures={[pictures[0]]} />
      </MemoryRouter>
    )
      .find(Slider)
      .dive();

    const SlideShowPictures = wrapper.instance()._renderSlideShowPictures;

    expect(wrapper.find(SlideShowPictures).exists()).toBe(true);
  });
});
