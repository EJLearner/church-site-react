import JubileePage from '.';

import {shallow} from 'enzyme';
import React from 'react';

describe('JubileePage', () => {
  it('renders', () => {
    expect(shallow(<JubileePage />).exists()).toBe(true);
  });
});
