import React from 'react';
import {shallow} from 'enzyme';
import JubileePage from '.';

describe('JubileePage', () => {
  it('renders', () => {
    expect(shallow(<JubileePage />).exists()).toBe(true);
  });
});
