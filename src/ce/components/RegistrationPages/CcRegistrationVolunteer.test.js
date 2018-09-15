import CcRegistrationVolunteer from './CcRegistrationVolunteer';
import constants from '../../../utils/constants';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import utils from '../../../utils/commonUtils';
jest.mock('../../../utils/commonUtils.js');

describe('CcRegistrationVolunteer', () => {
  it('render BaseRegistrationVolunteer', () => {
    const wrapper = shallow(<CcRegistrationVolunteer />);

    expect(wrapper.find('BaseRegistrationVolunteer').exists()).to.be.true;
  });

  it('BaseRegistrationVolunteer has correct props', () => {
    CcRegistrationVolunteer.prototype._renderHeaderContent = jest.fn(
      () => 'Header Content'
    );

    const testYear = '2000';
    utils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcRegistrationVolunteer />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationVolunteer');

    expect(baseRegistrationChild.props().askAvailability).to.not.be.ok;

    expect(baseRegistrationChild.props().className).to.equal(
      'registration-page'
    );

    expect(baseRegistrationChild.props().volunteerIdPropName).to.equal(
      constants.CC_REGISTERED_VOLUNTEER_ID_PROP
    );

    expect(baseRegistrationChild.props().headerContent).to.equal(
      wrapper.instance()._renderHeaderContent()
    );

    expect(baseRegistrationChild.props().refName).to.equal(
      `${constants.CC_REGISTERED_VOLUNTEER_REF_NAME}/${testYear}`
    );
  });
});
