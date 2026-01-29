import styled from 'styled-components';

import STYLES from '../../utils/styleVariables';

const StyledPageNotFoundDiv = styled.div`
  margin: 0 64px;
  padding: 1em;
  background-color: ${STYLES.LOGICAL_COLORS.STANDARD_BACKGROUND};
  color: ${STYLES.LOGICAL_COLORS.STANDARD_TEXT};

  a,
  a:visited {
    color: rgb(0, 0, 238);
    text-decoration: underline;
  }
`;

function NotFound() {
  return (
    <StyledPageNotFoundDiv>
      <h1>Page Not Found</h1>
      <p>
        The page that you were looking for was not found. Please go to the{' '}
        <a href="/">Home Page</a>.
      </p>
    </StyledPageNotFoundDiv>
  );
}

export default NotFound;
