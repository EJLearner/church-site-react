import VbsRegistrationStudent, {STUDENT_TYPES} from './VbsRegistrationStudent';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
jest.mock('../../../utils/commonUtils.js');

describe('VbsRegistrationStudent', () => {
  let props;

  beforeEach(() => {
    props = {
      studentType: STUDENT_TYPES.ADULT
    };
  });

  describe('for adult page type', () => {
    beforeEach(() => {
      props.studentType = STUDENT_TYPES.ADULT;
    });

    it('does not ask for child date of birth', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(
        wrapper
          .find('Text')
          .find({id: 'childDob'})
          .exists()
      ).to.be.false;
    });

    it('does not ask for parent name', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(
        wrapper
          .find('Text')
          .find({id: 'parentName'})
          .exists()
      ).to.be.false;
    });

    it('does not have parent/guardian information header', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.text()).to.not.include('Guardian Information');
    });
  });

  describe('for child page type', () => {
    beforeEach(() => {
      props.studentType = STUDENT_TYPES.CHILD;
    });

    it('asks for child date of birth', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(
        wrapper
          .find('Text')
          .find({id: 'childDob'})
          .exists()
      ).to.be.true;
    });

    it('asks for parent name', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(
        wrapper
          .find('Text')
          .find({id: 'parentName'})
          .exists()
      ).to.be.true;
    });

    it('has parent/guardian information header', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.text()).to.include('Guardian Information');
    });
  });
});