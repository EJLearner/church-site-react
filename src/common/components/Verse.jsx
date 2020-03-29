import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import getVerseInfo from '../../stores/getVerseInfo';

const StyleWrapper = styled.div`
  .v {
    vertical-align: super;
    font-size: 10px;
  }
`;

function renderPassages(passages) {
  return passages.map(passage => {
    return (
      <div
        dangerouslySetInnerHTML={{__html: passage.content}}
        key={passage.reference}
      />
    );
  });
}

function Verse({className, passage, referenceText}) {
  const [passages, setPassages] = useState([]);

  useEffect(() => {
    getVerseInfo(passage, response => {
      setPassages(response);
    });
    // setPassages([{reference: passage, content: `${passage} content`}]);
  }, [passage]);

  return (
    <StyleWrapper className={className ?? undefined}>
      <span>{referenceText || passages?.[0]?.reference}</span>
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
