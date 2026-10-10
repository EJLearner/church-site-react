import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import authFetch from '../../utils/adminApi';
import SundaySchoolRegistrationForm from '../RegistrationPages/SundaySchoolRegistrationForm';
import Button from '../commonComponents/Button/Button';
import Textbox from '../commonComponents/Textbox';

const StyledSundaySchoolAdmin = styled.div`
  .search {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;
    margin-bottom: 1em;
  }

  .review-banner {
    border: 2px solid var(--maroon);
    padding: 1em;
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

const formatName = ({first, last}) => `${first} ${last}`.trim();

// Resolves to {entries, error} so the caller can set state in one place
async function fetchLegacyRegistrations() {
  try {
    const res = await authFetch('/api/legacy-registrations');
    if (!res.ok) {
      throw new Error(
        (await res.json()).error ?? 'Unable to load registrations',
      );
    }
    return {entries: await res.json(), error: null};
  } catch (err) {
    return {entries: null, error: err.message};
  }
}

// True when every word of the search appears in the child's or a parent's name
function matchesSearch(entry, words) {
  const searchable = [formatName(entry.values.childName), ...entry.parentNames]
    .join(' ')
    .toLowerCase();
  return words.every((word) => searchable.includes(word));
}

function SundaySchoolAdmin({onKioskModeChange}) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);
  // Set while the parent is filling in the form: {entry} is the past
  // registration being reviewed, or null for a brand new registration
  const [handOff, setHandOff] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetchLegacyRegistrations().then((response) => {
      if (!ignore) {
        setEntries(response.entries);
        setError(response.error);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  // Leave kiosk mode if the page goes away mid hand-over (e.g. browser back)
  useEffect(() => () => onKioskModeChange?.(false), [onKioskModeChange]);

  // Hands the device to a parent: hides all menus and shows the form
  function startHandOff(entry) {
    setHandOff({entry});
    onKioskModeChange?.(true);
    window.scrollTo(0, 0);
  }

  function startNextFamily() {
    setHandOff(null);
    setSubmitted(false);
    setQuery('');
    onKioskModeChange?.(false);
  }

  if (submitted) {
    return (
      <StyledSundaySchoolAdmin>
        <h2>Thank you!</h2>
        <p>Your child is registered for Sunday School.</p>
        <Button onClick={startNextFamily}>Next family</Button>
      </StyledSundaySchoolAdmin>
    );
  }

  if (handOff) {
    const {entry} = handOff;
    return (
      <StyledSundaySchoolAdmin>
        <h2>Sunday School Registration</h2>
        <div className="review-banner">
          {entry
            ? 'Please review the information below from a past registration. Correct anything that has changed, fill in any blanks, and press Submit.'
            : 'Please fill in the information below and press Submit.'}
        </div>
        <SundaySchoolRegistrationForm
          initialValues={entry?.values}
          legacySources={entry?.sources}
          onSubmitted={() => setSubmitted(true)}
        />
        <Button onClick={startNextFamily}>Cancel and return to search</Button>
      </StyledSundaySchoolAdmin>
    );
  }

  const searchWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = entries?.filter((entry) => matchesSearch(entry, searchWords));

  return (
    <StyledSundaySchoolAdmin>
      <h2>Sunday School Registration</h2>
      <p>Search past Children&apos;s Church and VBS registrations.</p>
      <div className="search">
        <Textbox
          id="legacy-search"
          label="Child or parent name"
          onChange={(value) => setQuery(value)}
          value={query}
        />
        <Button onClick={() => startHandOff(null)}>New registration</Button>
      </div>

      {error && <p role="alert">{error}</p>}
      {results?.length === 0 && <p>No matches found.</p>}
      {results?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Child</th>
              <th>Date of Birth</th>
              <th>Parents</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Last Registered</th>
              <th>Registrations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((entry) => {
              const {id, lastRegistered, parentNames, sources, values} = entry;
              return (
                <tr key={id}>
                  <td>{formatName(values.childName)}</td>
                  <td>{values.childDateOfBirth}</td>
                  <td>{parentNames.join(', ')}</td>
                  <td>{values.parentPhone}</td>
                  <td>{values.parentEmail}</td>
                  <td>{lastRegistered}</td>
                  <td>{sources.length}</td>
                  <td>
                    <Button onClick={() => startHandOff(entry)}>
                      Verify and Register
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </StyledSundaySchoolAdmin>
  );
}

SundaySchoolAdmin.propTypes = {
  onKioskModeChange: PropTypes.func,
};

export default SundaySchoolAdmin;
