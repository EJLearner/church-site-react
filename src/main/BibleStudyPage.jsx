import React from 'react';
import styled from 'styled-components';

const StyledBibleStudyPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  text-align: center;

  h3 {
    font-family: var(--sans-serif);
    margin: 32px 0 8px 0;
  }

  p {
    margin: 0 8px;
  }
`;

const BibleStudyPage = () => {
  return (
    <StyledBibleStudyPage>
      <h2>Growing deeper through God’s word</h2>

      <h3>Bible Study</h3>
      <p>Every Tuesday at 7 pm</p>

      <h3>Prayer Service</h3>
      <p>Every Wednesday at 6 pm</p>
    </StyledBibleStudyPage>
  );
};

export default BibleStudyPage;
