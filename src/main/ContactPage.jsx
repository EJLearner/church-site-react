import React from 'react';
import styled from 'styled-components';

import MainMenubar from './commonComponents/MainMenubar';

const ContactPage = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    text-align: center;
  }

  p {
    line-height: 200%;
  }
`;

const BibleStudyPage = () => {
  return (
    <ContactPage>
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
    </ContactPage>
  );
};

export default BibleStudyPage;
