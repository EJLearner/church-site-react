import {shallow} from 'enzyme';
import React from 'react';

import JubileePage from '.';

describe('JubileePage', () => {
  it('renders', () => {
    expect(shallow(<JubileePage />).exists()).toBe(true);
  });
});
