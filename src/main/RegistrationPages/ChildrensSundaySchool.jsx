import {useState} from 'react';
import styled from 'styled-components';

import choir from '../../assets/images/choir.jpg';
import MainMenubar from '../commonComponents/MainMenubar';

import SundaySchoolRegistrationForm from './SundaySchoolRegistrationForm';

const StyledGivingPage = styled.div`
  background-color: var(--top-content-background);
  min-height: 100%;

  .content {
    color: var(--top-content-text);
    padding-top: 32px;
    padding-bottom: var(--page-bottom-padding);
    margin: 0 clamp(16px, calc(-72.727px + 27.727vw), 240px) 16px;
  }

  h1 {
    font-size: var(--32-font-clamped);
    margin-top: 0;
    font-weight: normal;
    line-height: 120%;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-fields {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;

    select {
      background-color: white;
    }
  }

  .add-another {
    min-height: 40px;
  }

  .donate-button {
    background-color: var(--accent-background);
    border-radius: 4px;
    color: var(--accent-content);
    letter-spacing: 2px;
    text-align: center;
    font-size: 16px;
    padding: 8px;
    text-transform: uppercase;
    width: 250px;
  }
`;

const ChildrensSundaySchool = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <StyledGivingPage>
      <MainMenubar imageSource={choir} />
      <div className="content-wrapper">
        <div className="content">
          {submitted ? (
            <p>Thank you! Your child is registered for Sunday School.</p>
          ) : (
            <SundaySchoolRegistrationForm
              onSubmitted={() => setSubmitted(true)}
            />
          )}
        </div>
      </div>
    </StyledGivingPage>
  );
};

export default ChildrensSundaySchool;
