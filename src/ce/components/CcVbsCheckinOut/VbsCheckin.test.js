import React from 'react';
import constants from '../../../utils/constants';
import routePaths from '../../../routePaths';

import {shallow} from 'enzyme';

import VbsCheckin from './VbsCheckin';
import utils from '../../../utils/commonUtils';

describe('#render', () => {
  it('renders BaseCheckin', () => {
    const wrapper = shallow(<VbsCheckin />);
    expect(wrapper.find('BaseCheckin').exists()).toBe(true);
  });

  it('BaseCheckin has correct properties', () => {
    const testYear = '2000';
    utils.getVbsDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<VbsCheckin />);
    const baseCheckin = wrapper.find('BaseCheckin');

    expect(baseCheckin.props().logbookRefName).toBe(
      constants.VBS_LOGBOOK_REF_NAME
    );

    expect(baseCheckin.props().registerLink).toBe(
      routePaths.CE_VBS_REG_LANDING
    );

    expect(baseCheckin.props().registeredChildrenRefName).toBe(
      `${constants.VBS_REGISTERED_CHILDREN_REF_NAME}/${testYear}`
    );

    expect(baseCheckin.props().registryAccessRefName).toBe(
      constants.VBS_REGISTRY_ACCESS_REF_NAME
    );

    expect(baseCheckin.props().registryIdName).toBe(
      constants.VBS_REGISTERED_CHILD_ID_PROP
    );

    expect(baseCheckin.props().welcomeName).toBe('Vacation Bible School');
  });
});
