import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {post} from 'jquery';

import {
  WIDTHS,
  COLORS,
  LOGICAL_COLORS,
  FONT_FAMILIES
} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Textbox from '../common/components/Textbox';
import Textarea from '../common/components/Textarea';
import Button, {STYLES} from '../ce/components/Reusable/Button/Button';
import PostSubmitStatusMessage from '../ce/components/Common/PostSubmitStatusMessage';
import backgroundStore from '../stores/backgroundStore';
import TopInfoBox from './commonComponents/TopInfoBox';

const StyledDiv = styled.div`
  .content-and-sub-compass {
    background-color: white;
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING} 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-sides {
    border-top: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    display: flex;
    font-family: ${FONT_FAMILIES.ARIAL};
    font-size: 12px;
  }

  .side-times {
    color: ${COLORS.GRAY38};
    flex: 1 0;
    // font-size: 13.33px;
    min-width: 20%;
    padding: 1em;

    h2 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 110%;
    }

    h2.church-name {
      font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
      font-size: 18px;
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      text-transform: uppercase;
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
      line-height: 150%;
      margin-top: 4em;
    }
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    padding: 1em;
    width: 70%;

    h1 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
      // trying to align top of middle header with two side headers
      // maybe there's a better way
      margin-top: -3px;
      text-transform: uppercase;
    }
  }

  .message-sent-notification {
    background-color: green;
    color: white;
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
  }

  .submit-directions-button-wrapper {
    margin: 0.5em 0 3em 0;
  }

  .side-content-wrapper {
    border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    flex: 0 1;
    min-width: 20%;
    max-width: 25%;
    padding: 1em 2em 0 2em;

    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
      font-size: 18px;
      margin: 0;
      text-transform: uppercase;
    }

    iframe {
      width: 100%;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

const googleMapSource =
  'https://www.google.com/maps/embed?pb=' +
  '!1m18!1m12!1m3!1d3087.345806781657!2d-76.6268381850241!3d39.30308427951011!2m3!1f0!2f0!3f0!3m2' +
  '!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c804bb92cb30b3%3A0x89980f2bfdc2560a!2s317%20Dolphin%20St%2C%20' +
  'Baltimore%2C%20MD%2021217!5e0!3m2!1sen!2sus!4v1581891196487!5m2!1sen!2sus';

function renderLeftSideInfo() {
  return (
    <div className="side-times">
      <h2 className="church-name">The City Temple of Baltimore (Baptist)</h2>
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

const emptySendInfo = {
  name: '',
  emailAddress: '',
  message: ''
};

const thanksForInfoRender = (
  <p className="message-sent-notification">Your message was sent!</p>
);

const ContactPage = () => {
  useEffect(() => {
    backgroundStore.setBackgroundSource(
      backgroundStore.backgroundSources.CHOIR
    );

    return () => backgroundStore.resetBackground();
  }, []);

  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [responseError, setResponseError] = useState();
  const [fromAddress, setFromAddress] = useState('');
  const [sendInfo, setSendInfoRaw] = useState(emptySendInfo);

  const {name, emailAddress, message} = sendInfo;

  const setSendInfo = (value, prop) => {
    setPostStatus(null);
    setSendInfoRaw(sendInfo => ({...sendInfo, [prop]: value}));
    setShowThanksMessage(false);
  };

  const submitData = () => {
    const data = {
      name: sendInfo.name || 'Not Provided',
      emailAddress: sendInfo.emailAddress || 'Not Provided',
      message: sendInfo.message
    };

    post(
      '/contactUsSend.php',
      data,
      responseError => {
        if (responseError.success) {
          setShowThanksMessage(true);
        } else {
          setPostStatus('failure');
        }
      },
      'json'
    ).fail(responseError => {
      setPostStatus('failure');
      setResponseError(responseError);
    });
  };

  const validateAndSubmit = () => {
    if (message.length) {
      submitData();
      setErrors([]);
    } else {
      setErrors(['Please enter a message.']);
    }
  };

  const characterLimit = 300;
  const showError = Boolean(errors.length);

  return (
    <StyledDiv>
      <MainMenubar />
      <TopInfoBox>
        <h1>Contact Us</h1>
        <p>
          <p>
            Here at City Temple, we follow an Order of Worship. While our intent
            is to remain consistent with this Order of Worship, the experience
            can change in the blink of an eye based on a testimony, a musical
            selection, a prayer, or whatever moves the “spirit” within us.
          </p>{' '}
          <p>
            Our Worship Service officially begins at 9:00 am on Sunday morning
            and is a combination of pastoral ministry, musical
            ministry—including dance—and congregational ministry. The sermon is
            usually the focal point, surrounded by music, prayer, and a moment
            of fellowship.
          </p>{' '}
          <p>
            In general, we anticipate prelude, prayer, offering, sermon,
            invitation to Christian Discipleship and benediction during each
            worship service. All are welcome.
          </p>
        </p>
      </TopInfoBox>
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
              onChange={value => setSendInfo(value, 'name')}
              size={40}
              value={name}
            />
            <br />
            <Textbox
              id="address"
              label="Email Address"
              onChange={value => setSendInfo(value, 'emailAddress')}
              size={40}
              value={emailAddress}
            />
            <br />
            <Textarea
              characterLimit={characterLimit}
              columns={60}
              errors={
                showError && (
                  <ErrorMessage>You must enter a message.</ErrorMessage>
                )
              }
              id="message"
              label="Message"
              onChange={value => setSendInfo(value, 'message')}
              required
              rows={10}
              value={message}
            />
            <div>
              <Button
                buttonShape={STYLES.RECT}
                disable={!message.length}
                onClick={() => validateAndSubmit()}
              >
                Send
              </Button>
              <br />
              {Boolean(postStatus || errors.length) && (
                <PostSubmitStatusMessage
                  inputErrorMessage={
                    errors.length ? 'Please enter a message' : undefined
                  }
                  postStatus={postStatus}
                  responseError={responseError}
                />
              )}
              {showThanksMessage && thanksForInfoRender}
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
              <div className="submit-directions-button-wrapper">
                <Button
                  buttonShape={STYLES.RECT}
                  disable={!fromAddress.length}
                  onClick={() => {}}
                >
                  Get Directions
                </Button>
              </div>
              <input
                name="daddr"
                type="hidden"
                value="317 Dolphin Street Baltimore, MD 21217"
              />
            </form>
            <iframe
              allowFullScreen=""
              frameBorder="0"
              src={googleMapSource}
              title="Google Map of Church Location"
            ></iframe>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ContactPage;
