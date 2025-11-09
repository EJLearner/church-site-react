import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import getVerseInfo from '../../stores/getVerseInfo';

const StyleWrapper = styled.div`
  // v class comes from bible.com html response
  .v {
    vertical-align: super;
    font-size: 10px;
  }

  .reference {
    color: var(--charcoal-grey);
    font-weight: bold;
  }
`;

const LOAD_STATES = {
  loading: 'loading',
  complete: 'complete',
  // for when passage prop was not provided
  missingPassage: 'missingPassage',
  error: 'error',
};

function renderPassages(passages) {
  return passages.map(({content, reference}) => {
    return <div dangerouslySetInnerHTML={{__html: content}} key={reference} />;
  });
}

function Verse({passage, referenceText}) {
  const [passages, setPassages] = useState([]);
  const [loadState, setLoadState] = useState(LOAD_STATES.loading);

  useEffect(() => {
    if (passage) {
      getVerseInfo(passage, (response) => {
        setPassages(response);

        const newLoadState = response
          ? LOAD_STATES.complete
          : LOAD_STATES.error;
        setLoadState(newLoadState);
      });
    }
  }, [passage]);

  if (loadState === LOAD_STATES.loading) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading Passage
      </div>
    );
  }

  if (loadState === LOAD_STATES.error) {
    return `Error loading ${passage}`;
  }

  if (!passage) {
    return <p>Sorry, no verse is available at this time.</p>;
  }

  return (
    <StyleWrapper>
      <span className="reference">
        {referenceText ?? passages?.[0]?.reference}
      </span>
      {renderPassages(passages)}
    </StyleWrapper>
  );
}

Verse.propTypes = {
  passage: PropTypes.string,
  /** String used to display which verses are used if provided */
  referenceText: PropTypes.string,
};

export default Verse;
