import React from 'react';
import styled from 'styled-components';
import STYLES from '../../../utils/styleVariables';

const PageNotFoundTitle = styled.h1`
  color: ${STYLES.COLORS.LIGHT_BLUE};
`;

function NotFound() {
  return (
    <div>
      <PageNotFoundTitle>
        <span>Page Not FOUND</span>
      </PageNotFoundTitle>
      <p>
        Sorry, the page that you were looking for was not found. Please click a
        link at the top to navigate to a page.
      </p>
    </div>
  );
}

export default NotFound;
