import VbsRegistrationChild from './VbsRegistrationChild';
import constants from '../../../utils/constants';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import routePaths from '../../../routePaths';
import utils from '../../../utils/commonUtils';
jest.mock('../../../utils/commonUtils.js');

describe('VbsRegistrationChild', () => {
  it('render BaseRegistrationChild', () => {
    const wrapper = shallow(<VbsRegistrationChild />);

    expect(wrapper.find('BaseRegistrationChild').exists()).to.be.true;
  });

  it('BaseRegistrationChild has correct props', () => {
    VbsRegistrationChild.prototype._renderHeaderContent = jest.fn(
      () => 'Header Content'
    );

    const testYear = '2000';
    utils.getVbsDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<VbsRegistrationChild />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationChild');

    expect(baseRegistrationChild.props().childIdPropName).to.equal(
      constants.VBS_REGISTERED_CHILD_ID_PROP
    );

    expect(baseRegistrationChild.props().className).to.equal(
      'registration-page'
    );

    expect(baseRegistrationChild.props().headerContent).to.equal(
      wrapper.instance()._renderHeaderContent()
    );

    expect(baseRegistrationChild.props().refName).to.equal(
      `${constants.VBS_REGISTERED_CHILDREN_REF_NAME}/${testYear}`
    );

    expect(baseRegistrationChild.props().routePath).to.equal(
      routePaths.CE_VBS_REG_CHILD
    );
  });
});
