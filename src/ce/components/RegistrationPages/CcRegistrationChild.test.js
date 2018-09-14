import CcRegistrationChild from './CcRegistrationChild';
import constants from '../../../utils/constants';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';
jest.mock('../../../utils/commonUtils.js');

describe('CcRegistrationChild', () => {
  it('render BaseRegistrationChild', () => {
    const wrapper = shallow(<CcRegistrationChild />);

    expect(wrapper.find('BaseRegistrationChild').exists()).to.be.true;
  });

  it('BaseRegistrationChild has correct props', () => {
    CcRegistrationChild.prototype._renderHeaderContent = jest.fn(
      () => 'Header Content'
    );

    const testYear = '2000';
    utils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcRegistrationChild />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationChild');

    expect(baseRegistrationChild.props().childIdPropName).to.equal(
      constants.CC_REGISTERED_CHILD_ID_PROP
    );
    expect(baseRegistrationChild.props().className).to.equal(
      'registration-page'
    );
    expect(baseRegistrationChild.props().headerContent).to.equal(
      wrapper.instance()._renderHeaderContent()
    );
    expect(baseRegistrationChild.props().refName).to.equal(
      `${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${testYear}`
    );
    expect(baseRegistrationChild.props().routePath).to.equal(
      routePaths.CE_CC_REG_CHILD
    );
  });
});
