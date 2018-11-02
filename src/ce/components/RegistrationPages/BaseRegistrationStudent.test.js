import BaseRegistrationStudent from './BaseRegistrationStudent';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import routePaths from '../../../routePaths';
import ErrorList from '../Common/ErrorList';
jest.mock('firebase');
jest.mock('./registrationUtils.js');

describe('BaseRegistrationStudent', () => {
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

  it('should redirect if redirect state is truthy', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);
    wrapper.setState({redirect: true});

    const redirect = wrapper.find('Redirect');

    expect(redirect.exists()).to.be.true;
    expect(redirect.props().push).to.equal(true);
    expect(redirect.props().to.pathname).to.equal(routePaths.CE_THANK_YOU);
    expect(redirect.props().to.state.forMessage).to.equal(
      'you for registering.'
    );
  });

  it('should render outer div with className from prop', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);

    expect(wrapper.find(`div.${props.className}`).exists()).to.equal(true);
  });

  it('renders headerContent', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);

    expect(wrapper.containsMatchingElement(props.headerContent)).to.equal(true);
  });

  it('render errors when error state is not empty', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);
    wrapper.setState({errors: ['one', 'two']});

    expect(
      wrapper.containsMatchingElement(
        <ErrorList errors={wrapper.state().errors} />
      )
    ).to.be.true;
  });

  it('does not render errors when error state is empty', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);
    wrapper.setState({errors: []});

    expect(
      wrapper.containsMatchingElement(
        <ErrorList errors={wrapper.state().errors} />
      )
    ).to.not.be.true;
  });

  it('render headerContent prop', () => {
    const wrapper = shallow(<BaseRegistrationStudent {...props} />);
    expect(wrapper.containsMatchingElement(props.headerContent)).to.equal(true);
  });
});
