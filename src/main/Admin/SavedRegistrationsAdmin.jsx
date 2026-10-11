import '../../firebaseApp';
import {getDatabase, onValue, ref} from 'firebase/database';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {
  SUNDAY_SCHOOL_REF_NAME,
  getSchoolYear,
} from '../RegistrationPages/sundaySchoolRegistration';
import Select from '../commonComponents/Select';

const StyledSavedRegistrationsAdmin = styled.div`
  .year-select {
    margin-bottom: 1em;
  }

  table {
    width: 100%;
  }

  th,
  td {
    text-align: left;
    vertical-align: top;
  }
`;

const formatName = (name) => `${name?.first ?? ''} ${name?.last ?? ''}`.trim();

function formatAllergies({allergies, allergyDetails}) {
  if (allergies === 'yes') {
    return allergyDetails || 'Yes';
  }
  return allergies === 'no' ? 'None' : '';
}

const sortName = ({childName}) =>
  `${childName?.last ?? ''} ${childName?.first ?? ''}`.toLowerCase();

function SavedRegistrationsAdmin() {
  // {schoolYear: {pushId: registration}} straight from Firebase
  const [registrationsByYear, setRegistrationsByYear] = useState(null);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(getSchoolYear(new Date()));

  useEffect(
    () =>
      onValue(
        ref(getDatabase(), SUNDAY_SCHOOL_REF_NAME),
        (snapshot) => {
          setRegistrationsByYear(snapshot.val() ?? {});
          setError(null);
        },
        (loadError) => setError(loadError.message),
      ),
    [],
  );

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (!registrationsByYear) {
    return <p>Loading…</p>;
  }

  const years = [
    ...new Set([...Object.keys(registrationsByYear), selectedYear]),
  ].sort((first, second) => second.localeCompare(first));
  const registrations = Object.entries(
    registrationsByYear[selectedYear] ?? {},
  ).sort(([, first], [, second]) =>
    sortName(first).localeCompare(sortName(second)),
  );

  return (
    <StyledSavedRegistrationsAdmin>
      <h2>Saved Sunday School Registrations</h2>
      <div className="year-select">
        <Select
          id="school-year"
          label="School Year"
          onChange={(value) => setSelectedYear(value)}
          options={years.map((year) => ({label: year, value: year}))}
          value={selectedYear}
        />
      </div>

      <p>{registrations.length} registered</p>
      {registrations.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Child</th>
              <th>Date of Birth</th>
              <th>Parent/Guardian</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Emergency Contact</th>
              <th>Allergies</th>
              <th>Registered</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(([id, registration]) => (
              <tr key={id}>
                <td>{formatName(registration.childName)}</td>
                <td>{registration.childDateOfBirth}</td>
                <td>{formatName(registration.parentName)}</td>
                <td>{registration.parentPhone}</td>
                <td>{registration.parentEmail}</td>
                <td>
                  {formatName(registration.emergencyContactName)}
                  {registration.emergencyPhone &&
                    ` (${registration.emergencyPhone})`}
                </td>
                <td>{formatAllergies(registration)}</td>
                <td>
                  {registration.registerTime &&
                    new Date(registration.registerTime).toLocaleDateString()}
                </td>
                <td>
                  {registration.source === 'legacy' ? 'Returning' : 'New'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </StyledSavedRegistrationsAdmin>
  );
}

export default SavedRegistrationsAdmin;
