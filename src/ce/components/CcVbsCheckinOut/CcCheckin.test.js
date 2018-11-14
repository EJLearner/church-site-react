import React from 'react';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';

import {shallow} from 'enzyme';

import CcCheckin from './CcCheckin';
import {expect} from 'chai';
import utils from '../../../utils/commonUtils';

describe('#render', () => {
  it('renders BaseCheckin', () => {
    const wrapper = shallow(<CcCheckin />);
    expect(wrapper.find('BaseCheckin').exists()).to.be.true;
  });

  it('BaseCheckin has correct properties', () => {
    const testYear = '2000';
    utils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcCheckin />);
    const baseCheckin = wrapper.find('BaseCheckin');

    expect(baseCheckin.props().logbookRefName).to.equal(
      constants.CC_LOGBOOK_REF_NAME
    );

    expect(baseCheckin.props().registerLink).to.equal(
      routePaths.CE_CC_REG_CHILD
    );

    expect(baseCheckin.props().registeredChildrenRefName).to.equal(
      `${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${testYear}`
    );

    expect(baseCheckin.props().registryAccessRefName).to.equal(
      constants.CC_REGISTRY_ACCESS_REF_NAME
    );

    expect(baseCheckin.props().registryIdName).to.equal(
      constants.CC_REGISTERED_CHILD_ID_PROP
    );

    expect(baseCheckin.props().welcomeName).to.equal('Children’s Church');
  });
});
