import React from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const StyledContactPage = styled.div`
  background: var(--black);
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${choir});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    padding-bottom: var(--page-bottom-padding);
    text-align: center;
  }

  p {
    line-height: 200%;
  }
`;

const BibleStudyPage = () => {
  return (
    <StyledContactPage>
      <MainMenubar />
      <div className="content">
        <h2>Want to know more?</h2>
        <p>
          410.462.4800
          <br />
          church@thecitytemple.org
        </p>
        <br />
        <p>
          317 Dolphin Street
          <br />
          Baltimore, MD 21217
          <br />
        </p>
      </div>
    </StyledContactPage>
  );
};

export default BibleStudyPage;
