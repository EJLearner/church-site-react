import React from 'react';
import styled from 'styled-components';

const TitlesDiv = styled.div`
  text-align: right;
`;

export default function CoronaVirusContent() {
  return (
    <div>
      <TitlesDiv>
        <h1>Fear not. We are God’s. Isaiah 43:1</h1>
        <h2>Managing Fears of the Coronavirus</h2>
      </TitlesDiv>
      <p>
        Barely three months in to 2020, we are facing an epidemic unlike any
        we’ve seen in years. There’s dissention on the origin and no foreseeable
        cure or vaccine. Fearing such unknowns is natural and familiar,{' '}
        <b>
          <i>but not to those who’s faith is in the Lord</i>
        </b>
        . Learn more about identifying the symptoms, avoiding the virus,
        preventing the spread, and exercising your faith.
      </p>
    </div>
  );
}
