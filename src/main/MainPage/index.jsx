import React from 'react';
import styled from 'styled-components';

import PlainButton from '../commonComponents/PlainButton';

const StyledHomePage = styled.div`
  margin: 0 var(--gutter-space);

  * {
    text-align: center;
    font-size: 28px;
    color: var(--text-on-dark);
  }

  h1 {
    font-size: 48px;
    margin-top: 32px;
  }

  .worship-time {
    font-weight: bold;
  }
`;

function HomePage() {
  return (
    <StyledHomePage>
      <h1>Welcome to the City Temple of Baltimore (Baptist)</h1>
      <p className="worship-time">Worship and Live Stream SUnday at 9 am</p>
      <p className="mission">
        We shall become a spiritually mature Christian fellowship in order to
        provide an effective witness for Christ in this world!
      </p>
      <PlainButton />
    </StyledHomePage>
  );
}

export default HomePage;
