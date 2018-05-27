import BaseRegistrationChild from './BaseRegistrationChild';
import {shallow} from 'enzyme';
import React from 'react';
import routePaths from '../../../routePaths';
jest.mock('firebase');

it('should redirect if redirect state is truthy', () => {
  const wrapper = shallow(<BaseRegistrationChild refName="testRefname" />);
  wrapper.setState({redirect: true});

  const redirect = wrapper.find('Redirect');

  expect(redirect.exists()).toBeTruthy();
  expect(redirect.props().push).toEqual(true);
  expect(redirect.props().to.pathname).toEqual(routePaths.CE_THANK_YOU);
  expect(redirect.props().to.state.forMessage).toEqual('you for registering.');
});
