import React from 'react';
import styled from 'styled-components';

import choir from '../assets/main/images/choir.jpg';
import routePaths from '../routePaths';

import Anchor from './commonComponents/Anchor';

const StyledHomePage = styled.div`
  // background-attachment: fixed;
  // background: black;
  // background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  //   url(${choir});

  // background-repeat: no-repeat;
  // background-size: cover;

  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;

  padding: 0 64px;

  margin: 0 230px;
  text-align: center;
  font-size: 28px;
  color: var(--text-on-dark);

  h1 {
    font-size: 48px;
    margin-top: 32px;
  }

  .worship-time {
    font-weight: bold;
  }

  a.service-link {
    background-color: var(--accent-background);
    border-radius: 4px;
    color: var(--accent-content);
    display: block;
    font-size: 16px;
    margin-top: 21px;
    padding: 16px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: transform 0.1s;
  }

  a.service-link:hover {
    text-decoration: none;
    transform: scale(1.02);
  }

  a.service-link:visited {
    color: var(--accent-content);

    font-weight: bold;
  }
`;

function HomePage() {
  return (
    <StyledHomePage>
      <h1>
        Welcome to the
        <br />
        City Temple of Baltimore (Baptist)
      </h1>
      <p className="worship-time">Worship and Live Stream Sunday at 9 am</p>
      <p>
        We shall become a spiritually mature Christian fellowship in order to
        provide an effective witness for Christ in this world!
      </p>
      <Anchor className="service-link" path={routePaths.MAIN_WATCH}>
        Watch Our Latest Service
      </Anchor>
    </StyledHomePage>
  );
}

export default HomePage;
