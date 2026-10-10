import '../../firebaseApp';
import {getDatabase, push, ref} from 'firebase/database';
import PropTypes from 'prop-types';
import {useRef, useState} from 'react';

import pushToSubscribedList from '../../utils/pushToSubscribedList';
import Address from '../commonComponents/Address';
import Button from '../commonComponents/Button/Button';
import CheckList from '../commonComponents/CheckList';
import DatePicker from '../commonComponents/DatePicker';
import Email from '../commonComponents/Email';
import Name from '../commonComponents/Name';
import Phone from '../commonComponents/Phone';
import PostSubmitStatusMessage from '../commonComponents/PostSubmitStatusMessage';
import RadioList from '../commonComponents/RadioList';
import Textarea from '../commonComponents/Textarea';
import Textbox from '../commonComponents/Textbox';

import {
  BLANK_REGISTRATION,
  SUNDAY_SCHOOL_REF_NAME,
  buildRegistrationRecord,
  getSchoolYear,
} from './sundaySchoolRegistration';

const formatName = ({first, last}) => `${first} ${last}`.trim();

function SundaySchoolRegistrationForm({
  initialValues,
  legacySources,
  onSubmitted,
}) {
  const [registrationInfo, setRegistrationInfo] = useState(() => ({
    ...BLANK_REGISTRATION,
    ...initialValues,
  }));
  const [submitting, setSubmitting] = useState(false);
  // Tracks an in-progress save immediately, before a re-render updates state
  const submittingRef = useRef(false);
  const [responseError, setResponseError] = useState(null);

  const onRegistrationInfoChange = (value, id) => {
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async () => {
    // Button only styles itself as disabled, so ignore repeat clicks here
    if (submittingRef.current) {
      return;
    }
    submittingRef.current = true;
    const now = new Date();
    const record = buildRegistrationRecord(
      registrationInfo,
      legacySources,
      now,
    );

    setSubmitting(true);
    setResponseError(null);
    try {
      await push(
        ref(getDatabase(), `${SUNDAY_SCHOOL_REF_NAME}/${getSchoolYear(now)}`),
        record,
      );
    } catch (error) {
      setResponseError(error);
      setSubmitting(false);
      submittingRef.current = false;
      return;
    }

    if (record.subscribe && record.parentEmail) {
      pushToSubscribedList(
        record.parentEmail,
        'Sunday School Registration',
        formatName(record.parentName),
      );
    }
    onSubmitted(record);
  };

  return (
    <div className="sunday-school-registration-form">
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
        value={registrationInfo.childDateOfBirth}
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
      <label>
        <input
          checked={registrationInfo.subscribe}
          id="subscribe"
          onChange={(event) =>
            onRegistrationInfoChange(event.target.checked, 'subscribe')
          }
          type="checkbox"
        />
        Add the parent/guardian email to the church mailing list
      </label>
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
        label="Emergency Contact Phone Number"
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
      <p>Does your child have any allergies?</p>
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
        value={registrationInfo.signedDate}
      />
      {/* Do I need a signature field? */}
      {responseError && (
        <PostSubmitStatusMessage
          postStatus="failure"
          responseError={responseError}
        />
      )}
      <Button disable={submitting} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

SundaySchoolRegistrationForm.propTypes = {
  initialValues: PropTypes.object,
  legacySources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      table: PropTypes.string,
      year: PropTypes.string,
    }),
  ),
  onSubmitted: PropTypes.func.isRequired,
};

export default SundaySchoolRegistrationForm;
