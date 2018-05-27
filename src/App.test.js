import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

// const moment = require.requireActual('moment');
import moment from 'moment';

it('sets updateLocal function for moment', () => {
  moment.updateLocale = jest.fn();
  shallow(<App />);

  expect(moment.updateLocale).toHaveBeenCalledTimes(1);

  expect(moment.updateLocale.mock.calls[0][0]).toBe('en');

  const meridiemFunction = moment.updateLocale.mock.calls[0][1].meridiem;
  expect(meridiemFunction(5)).toBe('a.m.');
  expect(meridiemFunction(12)).toBe('p.m.');
  expect(meridiemFunction(22)).toBe('p.m.');
});

it('should render Routes', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Routes').exists()).toBeTruthy();
});
