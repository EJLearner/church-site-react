import React from 'react';
import styled from 'styled-components';

import {FONT_FAMILIES} from '../utils/styleVariables';

import StandardPageWrapper from './commonComponents/StandardPageWrapper';

// TODO add redirect to this page

const StyleWrapper = styled.div`
  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }
`;

function RemovedPage() {
  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <h1>This page no longer exists</h1>
        <p>
          Sorry, this page can no longer be reached. You will be redirected to
          the main page. Please use the link below if the redirect is not
          successful.
        </p>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}

export default RemovedPage;
