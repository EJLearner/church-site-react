import React from 'react';
import styled from 'styled-components';

import covidQAndAFlyer from '../../../assets/main/images/announcement-page-covid-q-and-a.png';
import {isoTimeHasPassed} from '../../../utils/dateTimeUtils';
import {COLORS} from '../../../utils/styleVariables';
import PlainButton from '../../commonComponents/PlainButton';

const StyleWrapper = styled.div`
  .description {
    font-weight: bold;
  }

  p {
    text-align: center;
    line-height: 1.5em;
  }

  ul {
    color: ${COLORS.GRAY77};
    font-style: italic;
    font-weight: bold;
    li {
      list-style-type: none;
      margin-bottom: 1em;
      text-align: center;
    }
  }

  button.rsvp-button {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    border-radius: 3px;
    background-color: #222222;
    padding: 18px;
    width: inherit;
  }
`;

export function CovidQAndA() {
  if (!isoTimeHasPassed('2021-03-27T12:00:00')) {
    const covidWebinarLink =
      'https://us02web.zoom.us/webinar/register/WN_YHMIcV_NQYiLzJjvacB5Kg';

    return (
      <StyleWrapper className="content" key="covid-q-and-a">
        <h2>Covid Q&amp;A Webinar</h2>
        <a
          className="flyer-image-link"
          href={covidWebinarLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="Flyer for covid 19 Q&amp;A Zoom webinar. Click to reserve seat"
            src={covidQAndAFlyer}
          />
        </a>
        <p className="description">
          Join Missionary Baptist Church on Saturday, March 27 at 11:00 AM EST
          for an interactive webinar honoring Dr. Kizzmekia S. Corbett, a
          scientist at the forefront of the development of the vaccine, with a
          featured live Q&amp;A and expert insights from Dr. Nwora Lance Okeke
          and Dr. Gentzon Hall.
        </p>
        <hr />
        <ul className="questions">
          <li>“Does it work?”</li>
          <li>“Is it safe?”</li>
          <li>“What are the benefits of vaccination?”</li>
          <li>“Are there side effects?”</li>
        </ul>
        <div className="description">
          <p>
            We know to wear a mask, stay at least 6 feet apart, avoid crowds ds
            to protect against COVID-19, however--many of us are out the safety
            and effectiveness of the vaccine.
          </p>
          <p>
            That’s why we’ve teamed up with leading science and medical fight
            against the coronavirus pandemic, to answer y d educate our
            community about the COVID-19 vaccine.
          </p>
        </div>

        <PlainButton
          className="rsvp-button"
          onClick={() => window.open(covidWebinarLink)}
        >
          Click Here to RSVP
        </PlainButton>
      </StyleWrapper>
    );
  }

  return null;
}
