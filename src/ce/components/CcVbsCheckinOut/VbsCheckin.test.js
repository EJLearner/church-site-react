import React from 'react';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';

import {shallow} from 'enzyme';

import VbsCheckin from './VbsCheckin';
import {expect} from 'chai';
import utils from '../../../utils/commonUtils';

describe('#render', () => {
  it('renders BaseCheckin', () => {
    const wrapper = shallow(<VbsCheckin />);
    expect(wrapper.find('BaseCheckin').exists()).to.be.true;
  });

  it('BaseCheckin has correct properties', () => {
    const testYear = '2000';
    utils.getVbsDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<VbsCheckin />);
    const baseCheckin = wrapper.find('BaseCheckin');

    expect(baseCheckin.props().logbookRefName).to.equal(
      constants.VBS_LOGBOOK_REF_NAME
    );

    expect(baseCheckin.props().registerLink).to.equal(
      routePaths.CE_CC_REG_STUDENT
    );

    expect(baseCheckin.props().registeredChildrenRefName).to.equal(
      `${constants.VBS_REGISTERED_CHILDREN_REF_NAME}/${testYear}`
    );

    expect(baseCheckin.props().registryAccessRefName).to.equal(
      constants.VBS_REGISTRY_ACCESS_REF_NAME
    );

    expect(baseCheckin.props().registryIdName).to.equal(
      constants.VBS_REGISTERED_CHILD_ID_PROP
    );

    expect(baseCheckin.props().welcomeName).to.equal('Vacation Bible School');
  });
});
