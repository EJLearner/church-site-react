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

function Verse({className, passage}) {
  const [passageInfo, setPassageInfo] = useState('');

  useEffect(() => {
    getVerseInfo(passage, response => {
      setPassageInfo(response);
    });
  }, [passage]);

  return (
    <StyleWrapper className={className ?? undefined}>
      <h3>Daily Devotional</h3>
      <span>{passageInfo.reference}</span>
      <div
        className="verses"
        dangerouslySetInnerHTML={{__html: passageInfo.content}}
      />
    </StyleWrapper>
  );
}

Verse.propTypes = {
  className: PropTypes.string,
  passage: PropTypes.string.isRequired
};

export default Verse;
