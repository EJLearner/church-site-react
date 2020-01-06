import styled from 'styled-components';
import React, {useState} from 'react';

import STYLES from '../utils/styleVariables';

import crowdHandsImage from '../assets/main/images/crowd-hands.png';
import './MainWelcome.css';

const MainImage = styled.img`
  width: 100%;
`;

const MessageAndMaps = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
`;

const Message = styled.div`
  min-width: 400px;
  flex: 0 0 0;
`;

const Maps = styled.div`
  flex: 0 0 0;
  text-align: center;
`;

const LocationTitle = styled.h3`
  color: ${STYLES.COLORS.RED};
`;

const Address = styled.div`
  margin-top: 1em;
`;

const TextSwitchButton = styled.button`
  background-color: ${STYLES.LOGICAL_COLORS.STANDARD_BACKGROUND}
  border: none;
  color: ${STYLES.COLORS.LIGHT_BLUE};
`;

const PlanYourVisitDiv = styled.div`
  margin-top: 3em;
`;

const PlanYourVisitContent = styled.div`
  padding: 1em 4em 1em 4em;
  text-align: center;
  position: relative;
`;

const TextInsideLines = styled.h3`
  color: ${STYLES.COLORS.LIGHT_BLUE};
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;

  &:before,
  &:after {
    background-color: ${STYLES.COLORS.LIGHTER_BLUE};
    content: '';
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  &:before {
    right: 0.5em;
    margin-left: -50%;
  }

  &:after {
    left: 0.5em;
    margin-right: -50%;
  }
`;

const HIDDEN_TEXT_TYPES = {
  WHAT_EXPECT: 'WHAT_EXPECT',
  FOR_YOUTH: 'FOR_YOUTH'
};

const HIDDEN_TEXTS = {
  WHAT_EXPECT:
    'What to expect. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium earum ' +
    'id ad velit sint, adipisci doloremque enim iste cumque ipsum quis ab, quidem hic non ' +
    'doloribus animi temporibus commodi.',
  FOR_YOUTH:
    'For youth. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium earum ' +
    'id ad velit sint, adipisci doloremque enim iste cumque ipsum quis ab, quidem hic non ' +
    'doloribus animi temporibus commodi.'
};

function MainWelcome() {
  function renderMap() {
    const src =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.345806781657!2d-76.6268381850241!' +
      '3d39.30308427951011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c804bb92cb30b3%3A0x89980f2bfdc25' +
      '60a!2s317%20Dolphin%20St%2C%20Baltimore%2C%20MD%2021217!5e0!3m2!1sen!2sus!4v1577660314371!5m2!1sen!2sus';

    return (
      <iframe
        allowFullScreen=""
        frameBorder="0"
        height="300"
        src={src}
        // style="border:0;"
        title="Location"
        width="400"
      />
    );
  }

  function renderDirectionInput() {
    const InputContainer = styled.div`
      background-color: ${STYLES.COLORS.LIGHTER_BLUE};
      padding: 0.5em;
    `;

    const AddressInput = styled.input`
      border: none;
      border-radius: 0;
      box-shadow: none;
    `;

    const DirectionsButton = styled.input`
      background-color: ${STYLES.COLORS.LIGHT_BLUE};
      color: ${STYLES.COLORS.WHITE};
      border-radius: 0;
      margin-top: 1em;
    `;

    return (
      <form action="http://maps.google.com/maps" method="get" target="_blank">
        <InputContainer>
          <AddressInput name="saddr" placeholder="Enter Address" type="text" />
        </InputContainer>
        <input
          name="daddr"
          type="hidden"
          value="317 Dolphin Street, Baltimore, MD"
        />
        <br />
        <DirectionsButton type="submit" value="Directions" />
      </form>
    );
  }

  const [contentDisplayType, setContentDisplayType] = useState(
    HIDDEN_TEXT_TYPES.WHAT_EXPECT
  );

  return (
    <div className="main-welcome">
      <MainImage
        alt="hands raised"
        className="main-picture"
        src={crowdHandsImage}
      />
      <MessageAndMaps>
        <Message>
          <h2 className="fancy-title">Welcome</h2>A welcome message will go here
          and it will make all who read it feel welcomed! We will invite them to
          join us for a Sunday service and to download past sermons on the
          website.
        </Message>
        <Maps>
          {renderMap()}
          <LocationTitle>Location</LocationTitle>
          <Address>317 Dolphin Street, Baltimore, Maryland 21217</Address>
          {renderDirectionInput()}
        </Maps>
      </MessageAndMaps>
      <PlanYourVisitDiv>
        <TextInsideLines>Plan Your Visit</TextInsideLines>
        <PlanYourVisitContent>
          <p>
            Here we will talk about what makes each service unique, e.g. first
            Sunday = communion, second Sunday Men’s Choir sings, third Sunday is
            Gospel Sunday, fourth Sunday = dance ministry. Have to figure out
            when we do christenings. First Sunday is also baptism Sunday.
            Service time. Clicking the links below will create text in the
            outline box right below the links.
          </p>
          <TextSwitchButton
            onClick={() => setContentDisplayType(HIDDEN_TEXT_TYPES.WHAT_EXPECT)}
          >
            What you should expect
          </TextSwitchButton>
          <TextSwitchButton
            onClick={() => setContentDisplayType(HIDDEN_TEXT_TYPES.FOR_YOUTH)}
          >
            For youth
          </TextSwitchButton>
          <div>{HIDDEN_TEXTS[contentDisplayType]}</div>
        </PlanYourVisitContent>
      </PlanYourVisitDiv>
    </div>
  );
}

export default MainWelcome;
