import React from 'react';
import styled from 'styled-components';

import choir from '../../assets/images/choir.jpg';
import Address from '../commonComponents/Address';
import Button from '../commonComponents/Button/Button';
import CheckList from '../commonComponents/CheckList';
import DatePicker from '../commonComponents/DatePicker';
import Email from '../commonComponents/Email';
import MainMenubar from '../commonComponents/MainMenubar';
import Name from '../commonComponents/Name';
import Phone from '../commonComponents/Phone';
import RadioList from '../commonComponents/RadioList';
import Select from '../commonComponents/Select';
import Textarea from '../commonComponents/Textarea';
import Textbox from '../commonComponents/Textbox';

const StyledGivingPage = styled.div`
  background-color: var(--top-content-background);
  min-height: 100%;

  .content {
    color: var(--top-content-text);
    padding-top: 32px;
    padding-bottom: var(--page-bottom-padding);
    margin: 0 clamp(16px, calc(-72.727px + 27.727vw), 240px) 16px;
  }

  h1 {
    font-size: var(--32-font-clamped);
    margin-top: 0;
    font-weight: normal;
    line-height: 120%;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-fields {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;

    select {
      background-color: white;
    }
  }

  .add-another {
    min-height: 40px;
  }

  .donate-button {
    background-color: var(--accent-background);
    border-radius: 4px;
    color: var(--accent-content);
    letter-spacing: 2px;
    text-align: center;
    font-size: 16px;
    padding: 8px;
    text-transform: uppercase;
    width: 250px;
  }
`;

const ChildrensSundaySchool = () => {
  const [registrationInfo, setRegistrationInfo] = React.useState({
    agreementCheckList: new Set(),
    allergies: '',
    childName: {first: '', last: ''},
    parentName: {first: '', last: ''},
    parentPhone: '',
    childDateOfBirth: '',
    childEmail: '',
    parentEmail: '',
    childPhone: '',
    emergencyContactName: {first: '', last: ''},
    emergencyContactRelationship: '',
    emergencyPhone: '',
    address: {
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      zip: '',
    },
    medicalFacility: '',
    physician: {first: '', last: ''},
    physicianPhone: '',
    allergyDetails: '',
    additionalInformation: '',
    signedDate: '',
  });

  const onRegistrationInfoChange = (value, id) => {
    console.log('onRegistrationInfoChange', value, id);

    setRegistrationInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onAllergiesChange = (event) => {
    const {value, id} = event.target;

    console.log('onAllergiesChange', value, id);
  };

  return (
    <StyledGivingPage>
      <MainMenubar imageSource={choir} />
      <div className="content-wrapper">
        <div className="content">
          <Name
            id="childName"
            label="Child's Name"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.childName}
          />
          <DatePicker
            id="childDateOfBirth"
            label="Date of Birth"
            onChange={onRegistrationInfoChange}
          />
          <Textbox
            id="childEmail"
            label="Child's Email"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.childEmail}
          />
          <Phone
            id="childPhone"
            label="Child's Phone Number"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.childPhone}
          />
          <Address
            id="address"
            label="Address"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.address}
          />
          <Name
            id="parentName"
            label="Parent/Guardian Name"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.parentName}
          />
          <Email
            id="parentEmail"
            label="Parent/Guardian Email"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.parentEmail}
          />
          <Phone
            id="parentPhone"
            label="Parent/Guardian Phone Number"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.parentPhone}
          />
          <Name
            id="emergencyContactName"
            label="Emergency Contact Name"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.emergencyContactName}
          />
          <Textbox
            id="emergencyContactRelationship"
            label="Relationship"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.emergencyContactRelationship}
          />
          <Phone
            id="emergencyPhone"
            label="Emergency ContactPhone Number"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.emergencyPhone}
          />
          <Textbox
            id="medicalFacility"
            label="Preferred Medical Facility"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.medicalFacility}
          />
          <Name
            id="physician"
            label="Name of Physician/Pediatrician"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.physician}
          />
          <Phone
            id="physicianPhone"
            label="Physician's Phone Number"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.physicianPhone}
          />
          <RadioList
            id="allergies"
            onChange={onRegistrationInfoChange}
            options={[
              {label: 'Yes', value: 'yes'},
              {label: 'No', value: 'no'},
            ]}
            value={registrationInfo.allergies}
          />
          <Textarea
            id="allergyDetails"
            label="Please Give Allergy Details"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.allergyDetails}
          />
          <Textarea
            id="additionalInformation"
            label="Do you want to add something about your child?"
            onChange={onRegistrationInfoChange}
            value={registrationInfo.additionalInformation}
          />
          {/*
          {/* Do I need a picture upload? */}
          <p>I, undersigned, agree with the following statements:</p>
          <CheckList
            id="agreementCheckList"
            onChange={onRegistrationInfoChange}
            options={[
              {
                label: 'I am the parent/guardian of the child indicated above.',
                value: 'parentGuardian',
              },
              {
                label:
                  'If emergency medical care is needed and I am unavailable, I authorize the supervising teacher to seek medical treatment for my child.',
                value: 'emergencyCare',
              },
              {
                label:
                  "I am giving my permission to take my child's pictures for classroom projects and post them on the church website.",
                value: 'picturePermission',
              },
            ]}
            value={registrationInfo.agreementCheckList}
          />

          <DatePicker
            id="signedDate"
            label="Signed Date"
            onChange={onRegistrationInfoChange}
          />
          <Button onClick={() => console.log(registrationInfo)}>Submit</Button>
          {/*Do I need a signature field? */}
        </div>
      </div>
    </StyledGivingPage>
  );
};

export default ChildrensSundaySchool;
