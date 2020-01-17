import React from 'react';
import styled from 'styled-components';

import {LOGICAL_COLORS, FONT_FAMILIES} from '../../../utils/styleVariables';

const TitleAndContent = styled.div`
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  padding: 1em;
  max-width: 500px;
`;

const TitlesDiv = styled.div`
  display: inline-block;
`;

const FirstLine = styled.h1`
  font-family: ${FONT_FAMILIES.BRUSH_SCRIPT};
  margin-bottom: 0;
  line-height: 0.7;
  text-align: right;
`;

const SecondLine = styled.h2`
  font-style: italic;
  margin-top: 0;
  text-align: right;
`;

function SacrificialSowing() {
  return (
    <TitleAndContent>
      <TitlesDiv>
        <FirstLine>Sacrificial Sowing</FirstLine>
        <SecondLine>Year of Jubilee!</SecondLine>
      </TitlesDiv>
      <p>
        2020 marks an important milestone in the life of our church. Join us
        each Sunday as we celebrate and thank God for 50 years of worship,
        outreach, and praise!
      </p>
    </TitleAndContent>
  );
}

export default SacrificialSowing;
