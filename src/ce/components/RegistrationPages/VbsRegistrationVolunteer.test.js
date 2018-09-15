import VbsRegistrationVolunteer from './VbsRegistrationVolunteer';
import constants from '../../../utils/constants';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import utils from '../../../utils/commonUtils';
jest.mock('../../../utils/commonUtils.js');

describe('VbsRegistrationVolunteer', () => {
  it('render BaseRegistrationVolunteer', () => {
    const wrapper = shallow(<VbsRegistrationVolunteer />);

    expect(wrapper.find('BaseRegistrationVolunteer').exists()).to.be.true;
  });

  it('BaseRegistrationVolunteer has correct props', () => {
    VbsRegistrationVolunteer.prototype._renderHeaderContent = jest.fn(
      () => 'Header Content'
    );

    const testYear = '2000';
    utils.getVbsDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<VbsRegistrationVolunteer />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationVolunteer');

    expect(baseRegistrationChild.props().askAvailability).to.be.true;

    expect(baseRegistrationChild.props().className).to.equal(
      'registration-page'
    );

    expect(baseRegistrationChild.props().headerContent).to.equal(
      wrapper.instance()._renderHeaderContent()
    );

    expect(baseRegistrationChild.props().refName).to.equal(
      `${constants.VBS_REGISTERED_VOLUNTEER_REF_NAME}/${testYear}`
    );
  });
});
