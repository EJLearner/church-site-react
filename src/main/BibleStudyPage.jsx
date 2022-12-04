import React from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const StyledBibleStudyPage = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;

  .content {
    color: var(--text-on-light-background);
    display: flex;
    flex-direction: column;
    padding: 0 var(--gutter-space) var(--page-bottom-padding)
      var(--gutter-space);
    text-align: center;
  }

  h3 {
    font-family: var(--sans-serif);
    margin: 0px 0 8px 0;
  }

  p {
    margin: 0 8px;
  }
`;

const BibleStudyPage = () => {
  return (
    <StyledBibleStudyPage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <h2>Growing deeper through God’s word</h2>
        <h3>Bible Study</h3>
        <p>Every Tuesday at 7 pm</p>
        <h3>Prayer Service</h3>
        <p>Every Wednesday at 6 pm</p>
      </div>
    </StyledBibleStudyPage>
  );
};
export default BibleStudyPage;
