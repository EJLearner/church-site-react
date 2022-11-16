import React from 'react';
import styled from 'styled-components';

const StyledBibleStudyPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  h2 {
    text-align: center;
  }

  h2:nth-child(1) {
    margin-top: 0;
  }

  .pastor-info-and-picture {
    align-self: center;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }

  .pastor-info {
    margin-right: 64px;
  }

  img {
    box-shadow: 3px 3px 5px 0 var(--white);
    height: 280px;
    transform: rotate(5deg) translateY(15px);
    transform-origin: top left;
  }

  .history {
    margin-top: 32px;
    align-self: center;
    width: 60%;
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
