import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const StyledBibleStudyPage = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;
  display: flex;
  flex-direction: column;

  // TODO: rename these throughout to just "content"
  .actual-content {
    color: var(--text-on-light-background);
    display: flex;
    flex-direction: column;
    font-size: var(--19-font-clamped);
    text-align: center;
  }

  h2 {
    font-size: var(--32-font-clamped);
  }

  h3 {
    font-size: var(--28-font-clamped);
    font-family: var(--sans-serif);
    margin: 16px 0 8px 0;
  }

  h3:last-of-type {
    margin-top: 32px;
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
        <div className="actual-content">
          <h2>Growing deeper through God’s word</h2>
          <h3>Bible Study</h3>
          <p>Every Tuesday at 7 pm</p>
          <h3>Prayer Service</h3>
          <p>Every Wednesday at 6 pm</p>
        </div>
      </div>
    </StyledBibleStudyPage>
  );
};
export default BibleStudyPage;
