import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import getVerseInfo from '../../stores/getVerseInfo';

const StyleWrapper = styled.div`
  .v {
    vertical-align: super;
    font-size: 10px;
  }

  .reference {
    font-style: italic;
    font-weight: bold;
  }
`;

function LoadingMessage() {
  return (
    <div>
      <i className="fa fa-spinner fa-pulse" /> Loading Passage
    </div>
  );
}

function renderPassages(passages) {
  return passages.map(({content, reference}, index) => {
    if (content) {
      return (
        <div dangerouslySetInnerHTML={{__html: content}} key={reference} />
      );
    }

    return <LoadingMessage key={index} />;
  });
}

function Verse({className, passage, referenceText}) {
  const [passages, setPassages] = useState([]);

  useEffect(() => {
    getVerseInfo(passage, response => {
      setPassages(response);
    });
  }, [passage]);

  const loadingMessage = <LoadingMessage />;

  return (
    <StyleWrapper className={className ?? undefined}>
      <span className="reference">
        {referenceText || passages?.[0]?.reference || loadingMessage}
      </span>
      {renderPassages(passages)}
    </StyleWrapper>
  );
}

Verse.propTypes = {
  className: PropTypes.string,
  passage: PropTypes.string.isRequired,
  /** String used to display which verses are used if provided */
  referenceText: PropTypes.string
};

export default Verse;
