import React from 'react';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import Anchor from '../commonComponents/Anchor';

const StyledHomePage = styled.div`
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

  .anchor-wrapper {
    display: flex;
    justify-content: center;
  }

  a.service-link {
    border-radius: 4px;
    font-size: 22px;
    text-transform: uppercase;
    background-color: var(--ct-primary);
    color: var(--ct-text-on-primary);
    padding: 8px;
    text-decoration: none;

    display: flex;
    justify-content: space-between;
    width: 400px;
  }

  a.service-link:visited {
    color: var(--ct-text-on-primary);

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

      <div className="anchor-wrapper">
        <Anchor className="service-link" path={routePaths.MAIN_WATCH}>
          <span>Watch Our Latest Service!</span>
          <span className="arrow">🠖</span>
        </Anchor>
      </div>
    </StyledHomePage>
  );
}

export default HomePage;
