import {useState} from 'react';
import styled from 'styled-components';

import choir from '../../assets/images/choir.jpg';
import MainMenubar from '../commonComponents/MainMenubar';

import SundaySchoolRegistrationForm from './SundaySchoolRegistrationForm';

const StyledSundaySchoolPage = styled.div`
  background-color: var(--top-content-background);
  min-height: 100%;

  .content {
    color: var(--top-content-text);
    padding-top: 32px;
    padding-bottom: var(--page-bottom-padding);
    margin: 0 clamp(16px, calc(-72.727px + 27.727vw), 240px) 16px;
  }

  .intro {
    margin: 0 auto 24px;
    max-width: 760px;
  }

  h1 {
    font-size: var(--32-font-clamped);
    margin-top: 0;
    font-weight: normal;
    line-height: 120%;
  }

  .intro p {
    font-size: 16px;
    margin: 0;
  }
`;

const ChildrensSundaySchool = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <StyledSundaySchoolPage>
      <MainMenubar imageSource={choir} />
      <div className="content-wrapper">
        <div className="content">
          <div className="intro">
            <h1>Children&apos;s Sunday School Registration</h1>
            {submitted ? (
              <p role="status">
                Thank you! Your child is registered for Sunday School.
              </p>
            ) : (
              <p>
                Please fill out the form below to register your child for Sunday
                School.
              </p>
            )}
          </div>
          {!submitted && (
            <SundaySchoolRegistrationForm
              onSubmitted={() => setSubmitted(true)}
            />
          )}
        </div>
      </div>
    </StyledSundaySchoolPage>
  );
};

export default ChildrensSundaySchool;
