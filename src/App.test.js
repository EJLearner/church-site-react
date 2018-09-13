import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import {expect} from 'chai';

// const moment = require.requireActual('moment');
import moment from 'moment';

it('sets updateLocal function for moment', () => {
  moment.updateLocale = jest.fn();
  shallow(<App />);

  expect(moment.updateLocale.mock.calls).to.have.length(1);

  expect(moment.updateLocale.mock.calls[0][0]).to.equal('en');

  const meridiemFunction = moment.updateLocale.mock.calls[0][1].meridiem;
  expect(meridiemFunction(5)).to.equal('a.m.');
  expect(meridiemFunction(12)).to.equal('p.m.');
  expect(meridiemFunction(22)).to.equal('p.m.');
});

it('should render Routes', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Routes').exists()).to.be.true;
});
