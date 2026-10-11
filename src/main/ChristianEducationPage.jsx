import {Link} from 'react-router-dom';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import routePaths from '../routePaths';

import MainMenubar from './commonComponents/MainMenubar';

const StyledChristianEducationPage = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .content {
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

  h3:not(:first-of-type) {
    margin-top: 32px;
  }

  .content a {
    color: var(--maroon);
    font-weight: bold;
  }

  p {
    margin: 0 8px;
  }
`;

const ChristianEducationPage = () => {
  return (
    <StyledChristianEducationPage>
      <MainMenubar imageSource={choir} />
      <div className="content-wrapper">
        <div className="content">
          <h2>Growing deeper through God’s word</h2>
          <h3>Bible Study</h3>
          <p>Every Tuesday at 7 pm</p>
          <h3>Prayer Service</h3>
          <p>Every Wednesday at 6 pm</p>
          <h3>Children&apos;s Sunday School</h3>
          <p>
            <Link to={`/${routePaths.MAIN_SUNDAY_SCHOOL}`}>
              Register your child
            </Link>
          </p>
        </div>
      </div>
    </StyledChristianEducationPage>
  );
};
export default ChristianEducationPage;
