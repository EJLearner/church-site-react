import BaseRegistrationChild from './BaseRegistrationChild';
import {shallow} from 'enzyme';
import React from 'react';
import routePaths from '../../../routePaths';
import registrationUtils from './registrationUtils';
jest.mock('firebase');
jest.mock('./registrationUtils.js');

describe('BaseRegistrationChild', () => {
  let props;

  beforeEach(() => {
    jest.mock('firebase');
    jest.mock('./registrationUtils.js');

    props = {
      childIdPropName: 'testId',
      className: 'test-class',
      headerContent: <h1 id="header-content">test-header</h1>,
      refName: 'test-ref-name',
      routePath: '/test/path'
    };
  });

  afterEach(() => {
    registrationUtils.renderErrors.mockClear();
  });

  it('should redirect if redirect state is truthy', () => {
    const wrapper = shallow(<BaseRegistrationChild {...props} />);
    wrapper.setState({redirect: true});

    const redirect = wrapper.find('Redirect');

    expect(redirect.exists()).toBeTruthy();
    expect(redirect.props().push).toEqual(true);
    expect(redirect.props().to.pathname).toEqual(routePaths.CE_THANK_YOU);
    expect(redirect.props().to.state.forMessage).toEqual(
      'you for registering.'
    );
  });

  it('should render outer div with className from prop', () => {
    const wrapper = shallow(<BaseRegistrationChild {...props} />);

    expect(wrapper.find(`div.${props.className}`).exists()).toEqual(true);
  });

  it('renders headerContent', () => {
    const wrapper = shallow(<BaseRegistrationChild {...props} />);

    expect(wrapper.containsMatchingElement(props.headerContent)).toEqual(true);
  });

  it('renders errors', () => {
    const wrapper = shallow(<BaseRegistrationChild {...props} />);

    expect(registrationUtils.renderErrors).toHaveBeenCalledTimes(1);

    expect(wrapper.containsMatchingElement(props.headerContent)).toEqual(true);
  });
});
