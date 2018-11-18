import VbsRegistrationStudent, {STUDENT_TYPES} from './VbsRegistrationStudent';
import constants from '../../../utils/constants';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import utils from '../../../utils/commonUtils';
jest.mock('../../../utils/commonUtils.js');

describe('VbsRegistrationStudent', () => {
  describe('for adult page type', () => {
    it('does not ask for child date of birth', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.ADULT} />
      );

      expect(
        wrapper
          .find('Text')
          .find({id: 'childDob'})
          .exists()
      ).to.be.false;
    });

    it('does not ask for parent name', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.ADULT} />
      );

      expect(
        wrapper
          .find('Text')
          .find({id: 'parentName'})
          .exists()
      ).to.be.false;
    });

    it('does not have parent/guardian information header', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.ADULT} />
      );

      expect(wrapper.text()).to.not.include('Guardian Information');
    });
  });
  describe('for child page type', () => {
    it('asks for child date of birth', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.CHILD} />
      );

      expect(
        wrapper
          .find('Text')
          .find({id: 'childDob'})
          .exists()
      ).to.be.true;
    });

    it('asks for parent name', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.CHILD} />
      );

      expect(
        wrapper
          .find('Text')
          .find({id: 'parentName'})
          .exists()
      ).to.be.true;
    });

    it('has parent/guardian information header', () => {
      const wrapper = shallow(
        <VbsRegistrationStudent studentType={STUDENT_TYPES.ADULT} />
      );

      expect(wrapper.text()).to.include('Guardian Information');
    });
  });
});
