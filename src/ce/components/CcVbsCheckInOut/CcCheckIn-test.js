import React from 'react';

import {mount, shallow} from 'enzyme';
import slidePictureData from '../../utils/slidePictureData';

import BaseCheckin from './BaseCheckin';
import {MemoryRouter} from 'react-router';

describe('#constructor', () => {
  beforeEach(() => {});
});

describe('#render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BaseCheckin />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has sign in text box', () => {
    const nameTextBox = wrapper.find('Text').find({label: 'Sign In'});
    expect(nameTextBox.exists()).toBe(true);
  });
});
