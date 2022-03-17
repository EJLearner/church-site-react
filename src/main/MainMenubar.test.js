import {shallow} from 'enzyme';
import React from 'react';

import MainMenubar from './MainMenubar';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<MainMenubar />).exists()).toBe(true);
  });
});
