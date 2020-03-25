import React from 'react';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../../utils/styleVariables';

const StyleWrapper = styled.div`
  em {
    color: ${LOGICAL_COLORS.CT_ACCENT};
    font-weight: bold;
    font-style: normal;
    text-transform: uppercase;
  }
`;

function WorshipExperience() {
  return (
    <StyleWrapper>
      <h1>Watch Sunday’s Sermon</h1>
      <p>
        We are streaming our worship service! Click <em>Watch Sermon</em> below
        to view Sunday’s sermon.
      </p>
      <p>
        To prevent the spread of the coronavirus, we are suspending Sunday
        morning worship service until further notice. Please visit our website
        often and check your voice mails, text messages, and emails for
        up-to-date information as we go through this time of quarantine.
      </p>
    </StyleWrapper>
  );
}

export default WorshipExperience;
