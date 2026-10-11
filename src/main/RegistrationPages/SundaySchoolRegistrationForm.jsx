import '../../firebaseApp';
import {getDatabase, push, ref} from 'firebase/database';
import PropTypes from 'prop-types';
import {useRef, useState} from 'react';
import styled from 'styled-components';

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
import TextField from '../commonComponents/TextField';
import Textarea from '../commonComponents/Textarea';
import {ERROR_COLOR} from '../commonComponents/formFieldStyles';

import {
  AGREEMENT_OPTIONS,
  BLANK_REGISTRATION,
  SUNDAY_SCHOOL_REF_NAME,
  buildRegistrationRecord,
  getDateOfBirthRange,
  getSchoolYear,
  validateRegistration,
} from './sundaySchoolRegistration';

const FormStyle = styled.div`
  box-sizing: border-box;
  color: var(--text-on-light-background);
  font-family: var(--sans-serif);
  font-size: 16px;
  margin: 0 auto;
  max-width: 760px;
  text-align: left;
  width: 100%;

  .required-note {
    margin: 0 0 8px;
  }

  .required-mark {
    color: ${ERROR_COLOR};
  }

  section {
    border-top: 1px solid var(--maroon);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 32px;
    padding-top: 24px;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
  }

  label.block,
  legend.block {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .row {
    display: grid;
    gap: 20px 24px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    .row {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .checkbox-option {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: 10px;

    input {
      flex-shrink: 0;
      height: 18px;
      margin: 2px 0 0;
      width: 18px;
    }
  }

  /* Textarea is shared with older forms, so its layout is adjusted here */
  .text-box-pattern {
    display: block;
    margin: 0;

    textarea {
      border: 1px solid rgb(118, 118, 118);
      border-radius: 4px;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 16px;
      padding: 8px 10px;
      width: 100%;

      &:focus {
        border-color: var(--application-blue);
        outline: 2px solid var(--application-blue);
        outline-offset: 0;
      }

      &[aria-invalid='true'] {
        border-color: ${ERROR_COLOR};
      }
    }
  }

  .error-summary {
    border: 2px solid ${ERROR_COLOR};
    border-radius: 4px;
    margin-top: 16px;
    padding: 12px 16px;

    h2 {
      color: ${ERROR_COLOR};
      font-size: 18px;
    }

    ul {
      margin: 8px 0 0;
      padding-left: 20px;
    }

    a {
      color: ${ERROR_COLOR};
    }
  }

  .photo-note,
  .signature-note,
  .submitted-date {
    margin: 0;
  }

  .submit-button {
    align-self: flex-start;
    font-size: 16px;
    font-weight: 600;
    min-height: 44px;
    padding: 8px 40px;
  }
`;

const formatName = ({first, last}) => `${first} ${last}`.trim();

const formatLongDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const focusInput = (inputId) => document.getElementById(inputId)?.focus();

function SundaySchoolRegistrationForm({
  initialValues,
  legacySources,
  onSubmitted,
}) {
  const [registrationInfo, setRegistrationInfo] = useState(() => ({
    ...BLANK_REGISTRATION,
    ...initialValues,
  }));
  const [today] = useState(() => new Date());
  const [submitting, setSubmitting] = useState(false);
  // Tracks an in-progress save immediately, before a re-render updates state
  const submittingRef = useRef(false);
  const [responseError, setResponseError] = useState(null);
  // Errors show for inputs the user has left, and for every input after a
  // Submit attempt
  const [touchedIds, setTouchedIds] = useState(() => new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [badDateIds, setBadDateIds] = useState(() => new Set());

  const errors = validateRegistration(registrationInfo, today, badDateIds);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(
      ([inputId]) => submitAttempted || touchedIds.has(inputId),
    ),
  );
  const nameErrors = (id) => ({
    first: visibleErrors[`${id}-first`],
    last: visibleErrors[`${id}-last`],
  });
  const dateOfBirthRange = getDateOfBirthRange(today);

  const onRegistrationInfoChange = (value, id) => {
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onInputBlur = (value, id, event) => {
    const inputId = event.target.id;
    setTouchedIds((prevIds) =>
      prevIds.has(inputId) ? prevIds : new Set(prevIds).add(inputId),
    );
  };

  // A partly typed date has the value '', so ask the browser if it is bad
  const updateBadDate = (id, event) => {
    const isBad = Boolean(event.target.validity?.badInput);
    setBadDateIds((prevIds) => {
      if (prevIds.has(id) === isBad) {
        return prevIds;
      }
      const nextIds = new Set(prevIds);
      if (isBad) {
        nextIds.add(id);
      } else {
        nextIds.delete(id);
      }
      return nextIds;
    });
  };

  const onDateChange = (value, id, event) => {
    updateBadDate(id, event);
    onRegistrationInfoChange(value, id);
  };

  const onDateBlur = (value, id, event) => {
    updateBadDate(id, event);
    onInputBlur(value, id, event);
  };

  const onSubmit = async () => {
    // Button only styles itself as disabled, so ignore repeat clicks here
    if (submittingRef.current) {
      return;
    }
    const [firstErrorId] = Object.keys(errors);
    if (firstErrorId) {
      setSubmitAttempted(true);
      focusInput(firstErrorId);
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

  const visibleErrorEntries = Object.entries(visibleErrors);

  return (
    <FormStyle className="sunday-school-registration-form">
      <p className="required-note">
        Fields marked with <span className="required-mark">*</span> are
        required.
      </p>
      {submitAttempted && visibleErrorEntries.length > 0 && (
        <div className="error-summary" role="alert">
          <h2>Please fix the following:</h2>
          <ul>
            {visibleErrorEntries.map(([inputId, message]) => (
              <li key={inputId}>
                <a
                  href={`#${inputId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    focusInput(inputId);
                  }}
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section aria-labelledby="sunday-school-child-heading">
        <h2 id="sunday-school-child-heading">Child</h2>
        <Name
          errors={nameErrors('childName')}
          id="childName"
          label="Child's Name"
          onBlur={onInputBlur}
          onChange={onRegistrationInfoChange}
          required
          value={registrationInfo.childName}
        />
        <div className="row">
          <DatePicker
            errors={visibleErrors.childDateOfBirth}
            id="childDateOfBirth"
            label="Date of Birth"
            max={dateOfBirthRange.max}
            min={dateOfBirthRange.min}
            onBlur={onDateBlur}
            onChange={onDateChange}
            required
            value={registrationInfo.childDateOfBirth}
          />
        </div>
        <div className="row">
          <Email
            errors={visibleErrors.childEmail}
            id="childEmail"
            label="Child's Email"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            value={registrationInfo.childEmail}
          />
          <Phone
            errors={visibleErrors.childPhone}
            id="childPhone"
            label="Child's Phone Number"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            value={registrationInfo.childPhone}
          />
        </div>
      </section>

      <section aria-labelledby="sunday-school-address-heading">
        <h2 id="sunday-school-address-heading">Address</h2>
        <Address
          errors={{zip: visibleErrors['address-zip']}}
          id="address"
          label="Home Address"
          onBlur={onInputBlur}
          onChange={onRegistrationInfoChange}
          value={registrationInfo.address}
        />
      </section>

      <section aria-labelledby="sunday-school-parent-heading">
        <h2 id="sunday-school-parent-heading">Parent/Guardian</h2>
        <Name
          autoComplete
          errors={nameErrors('parentName')}
          id="parentName"
          label="Parent/Guardian Name"
          onBlur={onInputBlur}
          onChange={onRegistrationInfoChange}
          required
          value={registrationInfo.parentName}
        />
        <div className="row">
          <Email
            autoComplete="email"
            errors={visibleErrors.parentEmail}
            id="parentEmail"
            label="Email"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            value={registrationInfo.parentEmail}
          />
          <Phone
            autoComplete="tel"
            errors={visibleErrors.parentPhone}
            id="parentPhone"
            label="Phone Number"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            required
            value={registrationInfo.parentPhone}
          />
        </div>
        <label className="checkbox-option">
          <input
            checked={registrationInfo.subscribe}
            id="subscribe"
            onChange={(event) =>
              onRegistrationInfoChange(event.target.checked, 'subscribe')
            }
            type="checkbox"
          />
          <span>Add the parent/guardian email to the church mailing list</span>
        </label>
      </section>

      <section aria-labelledby="sunday-school-emergency-heading">
        <h2 id="sunday-school-emergency-heading">Emergency Contact</h2>
        <Name
          errors={nameErrors('emergencyContactName')}
          id="emergencyContactName"
          label="Emergency Contact Name"
          onBlur={onInputBlur}
          onChange={onRegistrationInfoChange}
          required
          value={registrationInfo.emergencyContactName}
        />
        <div className="row">
          <TextField
            errors={visibleErrors.emergencyContactRelationship}
            id="emergencyContactRelationship"
            label="Relationship"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            required
            supportText="e.g. Grandparent, Aunt, Neighbor"
            value={registrationInfo.emergencyContactRelationship}
          />
          <Phone
            errors={visibleErrors.emergencyPhone}
            id="emergencyPhone"
            label="Phone Number"
            onBlur={onInputBlur}
            onChange={onRegistrationInfoChange}
            required
            value={registrationInfo.emergencyPhone}
          />
        </div>
      </section>

      <section aria-labelledby="sunday-school-health-heading">
        <h2 id="sunday-school-health-heading">Health and Other Information</h2>
        <RadioList
          errors={visibleErrors['allergies-yes']}
          id="allergies"
          label="Does your child have any allergies?"
          onChange={onRegistrationInfoChange}
          options={[
            {label: 'Yes', value: 'yes'},
            {label: 'No', value: 'no'},
          ]}
          required
          value={registrationInfo.allergies}
        />
        {registrationInfo.allergies === 'yes' && (
          <Textarea
            errorMessage={visibleErrors.allergyDetails}
            id="allergyDetails"
            label="Please give allergy details"
            onChange={onRegistrationInfoChange}
            required
            rows={3}
            value={registrationInfo.allergyDetails}
          />
        )}
        <Textarea
          id="additionalInformation"
          label="Is there anything else you would like us to know about your child?"
          onChange={onRegistrationInfoChange}
          rows={4}
          value={registrationInfo.additionalInformation}
        />
      </section>

      <section aria-labelledby="sunday-school-agreement-heading">
        <h2 id="sunday-school-agreement-heading">Agreement</h2>
        <CheckList
          errors={AGREEMENT_OPTIONS.map(
            ({value}) => visibleErrors[`agreementCheckList-${value}`],
          ).find(Boolean)}
          id="agreementCheckList"
          label="I agree with the following statements:"
          onChange={onRegistrationInfoChange}
          options={AGREEMENT_OPTIONS}
          required
          value={registrationInfo.agreementCheckList}
        />
        <p className="photo-note">
          Your child&apos;s pictures may be taken for classroom projects and
          posted on the church website. If you do not want your child
          photographed, please tell the Sunday School staff.
        </p>
        <p className="signature-note">
          By pressing Submit, I confirm that the information above is accurate,
          that I agree to everything in this Agreement section, and that this
          serves as my electronic signature.
        </p>
        <p className="submitted-date">
          <strong>Date submitted:</strong> {formatLongDate(today)}
        </p>
        {responseError && (
          <PostSubmitStatusMessage
            postStatus="failure"
            responseError={responseError}
          />
        )}
        <Button
          className="submit-button"
          disable={submitting}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </section>
    </FormStyle>
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
