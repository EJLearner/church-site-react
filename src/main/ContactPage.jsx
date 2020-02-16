import React, {useState} from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Textbox from '../common/components/Textbox';
import Textarea from '../common/components/Textarea';
import Button from '../ce/components/Reusable/Button/Button';

const borderColor = 'gray';

const StyledDiv = styled.div`
  .content-and-sub-compass {
    background-color: white;
    border: 1px solid ${borderColor};
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-sides {
    border-top: 1px solid ${borderColor};
    display: flex;
  }

  .side-times {
    flex: 0 0;
    font-size: 13.33px;
    padding: 1em;

    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      margin-bottom: 0;
      font-size: 110%;
    }

    ul {
      padding-left: 0;
    }

    li {
      list-style-type: none;
      margin-bottom: 1em;
    }

    .address-and-contact-info {
      font-weight: bold;
      margin-top: 4em;
    }
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${borderColor};
    padding: 1em;
    width: 70%;

    h1 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      text-transform: uppercase;
    }
  }

  .side-content-wrapper {
    border-left: 1px solid ${borderColor};
    flex: 0 1;
    min-width: 20%;
    max-width: 25%;
    padding: 1em 2em 0 2em;

    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      font-size: 18px;
      margin-bottom: 0;
      text-transform: uppercase;
    }
  }
`;

const submitMessage = () => {};

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

function renderLeftSideInfo() {
  return (
    <div className="side-times">
      <h2>City Temple Baltimore (Baptist)</h2>
      <ul>
        <li>
          <h2>Sunday Worship</h2>9 am
        </li>
        <li>
          <h2>Holy Communion &amp; Baptism</h2>First Sunday of each month
        </li>
        <li>
          <h2>Youth Church</h2>(second Sundays)
          <br />
          9am
        </li>
        <li>
          <h2>Sunday School</h2>11: 30 am
        </li>
        <li>
          <h2>Prayer Meeting</h2>Saturday before first Sunday
        </li>
        <li>
          <h2>Bible Study</h2>Tuesday, 12 pm &amp; 7 pm
          <br />
          Saturday, 12 pm
        </li>
      </ul>

      <p className="address-and-contact-info">
        317 Dolphin Street
        <br />
        Baltimore, MD 21217
        <br />
        Phone: 410.462.4800
        <br />
        Email: connect@thecitytemple.org
        <br />
      </p>
    </div>
  );
}

const ContactPage = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');

  const [fromAddress, setFromAddress] = useState('');

  const characterLimit = 300;
  // TODO: show error when text is blurred and message is empty
  const showError = false;

  return (
    <StyledDiv>
      <MainMenubar />

      <div className="content-and-sub-compass">
        <div className="compass">
          <AboveContentLinks pageTitle="Worship Experience" />
        </div>
        <div className="content-and-sides">
          {renderLeftSideInfo()}
          <div className="content">
            <h1>Contact Us</h1>
            <Textbox
              id="name"
              label="Name"
              onChange={value => setName(value)}
              size={40}
              value={name}
            />
            <br />
            <Textbox
              id="address"
              label="Email Address"
              onChange={value => setEmailAddress(value)}
              size={40}
              value={emailAddress}
            />
            <br />
            <Textarea
              characterLimit={characterLimit}
              columns={40}
              errors={
                showError && (
                  <ErrorMessage>You must enter a message.</ErrorMessage>
                )
              }
              id="message"
              label="Message"
              onChange={value => setMessage(value)}
              textArea
              value={message}
            />
            <div>
              <Button
                disable={!message.length}
                onClick={() => submitMessage(name, emailAddress, message)}
              >
                Send
              </Button>
            </div>
          </div>
          <div className="side-content-wrapper">
            <h2>Get Directions</h2>
            <form
              action="http://maps.google.com/maps"
              method="get"
              target="_blank"
            >
              <Textbox
                id="from-address"
                label="From"
                name="saddr"
                onChange={value => setFromAddress(value)}
                value={fromAddress}
              />
              <Button disable={!fromAddress.length} onClick={() => {}}>
                Get Directions
              </Button>
              <input
                name="daddr"
                type="hidden"
                value="317 Dolphin Street Baltimore, MD 21217"
              />
            </form>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ContactPage;
