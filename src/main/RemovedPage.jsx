import {useEffect, useState} from 'react';
import {Navigate} from 'react-router';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';

const RemovedPageStyle = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;

  .actual-content {
    color: var(--text-on-light-background);
    text-align: center;
  }

  p {
    margin: 0 8px;
  }
`;

function RemovedPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShouldRedirect(true);
    }, 8000);
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  }

  return (
    <RemovedPageStyle>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <div className="actual-content">
          <h1>This page no longer exists</h1>
          <p>
            Sorry, this page can no longer be reached. You will be redirected to
            the main page. Please use the link below if the redirect is not
            successful.
          </p>
        </div>
      </div>
    </RemovedPageStyle>
  );
}

export default RemovedPage;
