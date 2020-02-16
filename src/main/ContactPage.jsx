import React, {useState} from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Text from '../common/components/Text';
import Button from '../ce/components/Reusable/Button/Button';

const borderColor = 'gray';

const StyledDiv = styled.div`
  .top-info-box-wrapper {
    display: flex;
    justify-content: space-between;
    margin: ${WIDTHS.SIDE_CONTENT_PADDING};

    .top-info-box {
      min-width: 50%;
    }

    .more-content {
      margin-left: 1em;
    }
  }

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
    flex-shrink: 0;
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

  .menu-and-content {
    display: flex;
  }

  .side-content-wrapper {
    border-left: 1px solid ${borderColor};
    display: flex;
    flex-direction: column;
    min-width: 20%;
    max-width: 25%;
    padding: 1em 2em 0 2em;
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${borderColor};
    padding: 1em;
    width: 70%;

    h1,
    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
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
        Email: connect @thecitytemple.org
        <br />
      </p>
    </div>
  );
}

const ContactPage = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
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
          <div className="menu-and-content">
            <div className="content">
              <h1>Contact Us</h1>
              <Text
                id="name"
                label="Name"
                onChange={value => setName(value)}
                value={name}
              />
              <Text
                id="address"
                label="Email Address"
                onChange={value => setEmailAddress(value)}
                value={emailAddress}
              />
              <Text
                characterLimit={characterLimit}
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
          </div>
          <div className="side-content-wrapper">Side Content</div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ContactPage;
