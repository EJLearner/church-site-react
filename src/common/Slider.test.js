import React from 'react';

import {mount, shallow} from 'enzyme';

import Slider from './Slider';
import {MemoryRouter} from 'react-router';

describe('Slider', () => {
  let pictures;

  beforeEach(() => {
    pictures = [
      {altTag: 'Picture 1', source: '/test-source-1'},
      {altTag: 'Picture 2', source: '/test-source-2'},
      {altTag: 'Picture 3', linkPath: '/fake-path-3', source: '/test-source-3'}
    ];
  });

  describe('#constructor', () => {
    beforeEach(() => {
      window.onresize = undefined;
    });

    it('should set the slideIndex state to 0', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);

      expect(wrapper.state().slideIndex).toBe(0);
    });

    it('should set slideShowIsOn state to true if more than one picture exists', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);

      expect(wrapper.state().slideShowIsOn).toBe(true);
    });

    it.skip('should call savePictureHeight on window resize', () => {
      expect(window.onresize).toBe(undefined);
      const wrapper = shallow(<Slider pictures={pictures} />);

      wrapper.instance().savePictureHeight = jest.fn();
      wrapper.update();

      expect(wrapper.instance().savePictureHeight).to.beCalled();
    });

    it('should set slideShowIsOn state to false if only one picture exists', () => {
      const wrapper = shallow(<Slider pictures={[pictures[0]]} />);

      expect(wrapper.state().slideShowIsOn).toBe(false);
    });
  });

  describe('#render', () => {
    it('renders with proper class and id', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);

      const outerDiv = wrapper.find('#leftcontent');

      expect(outerDiv.props().className).toBe('slider-chris');
      expect(outerDiv.props().id).toBe('leftcontent');
    });

    it('makes sliderDiv as ref to self', () => {
      const wrapper = mount(
        <MemoryRouter>
          <Slider pictures={pictures} />
        </MemoryRouter>
      ).find(Slider);

      expect(wrapper.instance().sliderDiv.id).toBe('leftcontent');
    });

    it('renders renderSlideShowButtons if there is more than one picture', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);

      expect(pictures.length).toBeGreaterThan(1);
      expect(wrapper.find('.slider-control-buttons').exists()).toBeTruthy();
    });

    it('does not render renderSlideShowButtons if there is one picture', () => {
      const wrapper = shallow(<Slider pictures={[pictures[0]]} />);

      expect(wrapper.find('.sliderControlButtons').exists()).toBe(false);
    });

    it('renders SlideShowPictures', () => {
      const wrapper = shallow(<Slider pictures={[pictures[0]]} />);

      expect(wrapper.find('.slideshow').exists()).toBe(true);
    });

    it('renders pause button when slideshow is on', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      expect(wrapper.state().slideShowIsOn).toBe(true);

      const pauseButton = wrapper.find('.fa-pause');
      expect(pauseButton.exists()).toBe(true);
    });

    it('renders play button when slideshow is on', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      wrapper.setState({slideShowIsOn: false});

      const playButton = wrapper.find('.fa-play');
      expect(playButton.exists()).toBe(true);
    });
  });

  describe('actions', () => {
    it('goes to next picture if next button is pressed', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      expect(wrapper.state().slideIndex).toBe(0);

      const nextButton = wrapper.find('.next');
      expect(nextButton.exists()).toBe(true);

      nextButton.simulate('click');
      expect(wrapper.state().slideIndex).toBe(1);
    });

    it('goes to prev picture if prev button is pressed', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      wrapper.setState({slideIndex: 2});

      const prevButton = wrapper.find('.prev');
      expect(prevButton.exists()).toBe(true);

      prevButton.simulate('click');
      expect(wrapper.state().slideIndex).toBe(1);
    });

    it('goes directly to slide if picture select button is pressed', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      expect(wrapper.state().slideIndex).toBe(0);

      const pictureSelectButtons = wrapper.find('.picture-select-button');

      pictureSelectButtons.at(2).simulate('click');

      expect(wrapper.state().slideIndex).toBe(2);
    });

    it('goes directly to slide if picture select button is pressed', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      expect(wrapper.state().slideIndex).toBe(0);

      const pictureSelectButtons = wrapper.find('.picture-select-button');

      pictureSelectButtons.at(2).simulate('click');

      expect(wrapper.state().slideIndex).toBe(2);
    });

    it('does nothing if button is pressed for current picture', () => {
      const wrapper = shallow(<Slider pictures={pictures} />);
      expect(wrapper.state().slideIndex).toBe(0);

      const pictureSelectButtons = wrapper.find('.picture-select-button');

      pictureSelectButtons.at(0).simulate('click');

      expect(wrapper.state().slideIndex).toBe(0);
    });
  });
});
