import {useEffect, useState} from 'react';
import styled from 'styled-components';

import authFetch from '../../utils/adminApi';
import Textbox from '../commonComponents/Textbox';

const StyledSundaySchoolAdmin = styled.div`
  .search {
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

function SundaySchoolAdmin() {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);

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
            </tr>
          </thead>
          <tbody>
            {results.map(
              ({id, lastRegistered, parentNames, sources, values}) => (
                <tr key={id}>
                  <td>{formatName(values.childName)}</td>
                  <td>{values.childDateOfBirth}</td>
                  <td>{parentNames.join(', ')}</td>
                  <td>{values.parentPhone}</td>
                  <td>{values.parentEmail}</td>
                  <td>{lastRegistered}</td>
                  <td>{sources.length}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </StyledSundaySchoolAdmin>
  );
}

export default SundaySchoolAdmin;
