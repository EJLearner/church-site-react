import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import moment from 'moment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('sets updateLocal function for moment (am)', () => {
  expect(moment('2017-08-27T08:00:00').format('a')).toBe('a.m.');
});

it('sets updateLocal function for moment (pm)', () => {
  expect(moment('2017-08-27T15:00:00').format('a')).toBe('p.m.');
});
