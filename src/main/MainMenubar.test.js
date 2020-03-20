import MainMenubar from './MainMenubar';

import {shallow} from 'enzyme';
import React from 'react';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<MainMenubar />).exists()).toBe(true);
  });
});
