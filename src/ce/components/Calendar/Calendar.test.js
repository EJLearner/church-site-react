import {shallow} from 'enzyme';
import React from 'react';

import Calendar from './Calendar';

describe('Calendar', () => {
  it('renders', () => {
    expect(shallow(<Calendar />).exists()).toBe(true);
  });
});
