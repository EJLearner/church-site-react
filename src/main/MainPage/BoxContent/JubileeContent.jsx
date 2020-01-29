import React from 'react';
import styled from 'styled-components';

const TitlesDiv = styled.div`
  display: inline-block;
`;

const FirstLine = styled.h1`
  text-align: right;
`;

const Numbers = styled.span`
  font-size: 160%;
`;

const SecondLine = styled.h2`
  text-align: right;
`;

function JubileeContent() {
  return (
    <div>
      <TitlesDiv>
        <FirstLine>
          <Numbers>
            50<sup>th</sup>
          </Numbers>{' '}
          Anniversary Celebration
        </FirstLine>
        <SecondLine>Join the Jubilee!</SecondLine>
      </TitlesDiv>
      <p>
        2020 marks an important milestone in the life of our church. Join us
        each Sunday as we celebrate and thank God for 50 years of worship,
        outreach, and praise! In the Jewish tradition, “nothing was expected of
        the people but faith in Yahweh and confidence in His power” (William
        Baur). Celebrate and reflect on these 50 years for the renewal of your
        spirit and confidence in our Lord and Savior.
      </p>
    </div>
  );
}

export default JubileeContent;
