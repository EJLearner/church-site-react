import React from 'react';

import {shallow} from 'enzyme';
import ContentSelectBoxes from './ContentSelectBoxes';

describe('ContentSelectBoxes', () => {
  it('renders', () => {
    expect(shallow(<ContentSelectBoxes />).exists()).toBe(true);
  });
});
