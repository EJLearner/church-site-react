import {post} from 'jquery';
import React, {useState} from 'react';

import PostSubmitStatusMessage from '../ce/components/Common/PostSubmitStatusMessage';
import Button, {
  SHAPES,
  BUTTON_COLORS
} from '../ce/components/Reusable/Button/Button';
import Textarea from '../common/components/Textarea';
import Textbox from '../common/components/Textbox';

export default function PerformingArtsForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [talentArea, setTalentArea] = useState('');
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const [error, setError] = useState(null);
  const [responseError, setResponseError] = useState();

  const submitData = () => {
    const data = {
      email: email || 'Not Provided',
      phone: phone || 'Not Provided',
      talentArea,
      name: name || 'Not Provided'
    };

    post(
      '/contactUsPerformingArts.php',
      data,
      (responseError) => {
        if (responseError.success) {
          setShowThanksMessage(true);
        } else {
          setPostStatus('failure');
        }
      },
      'json'
    ).fail((responseError) => {
      setPostStatus('failure');
      setResponseError(responseError);
    });
  };

  const validateAndSubmit = () => {
    if (talentArea.length) {
      submitData();
      setError(null);
    } else {
      setError('Please describe your talent area.');
    }
  };

  return (
    <>
      <p>
        Call (443) 800-9231 Monday–Friday between 9 am - 5 pm or submit the
        form.
      </p>
      <Textbox
        id="name"
        label="Name"
        onChange={(value) => setName(value)}
        size={40}
        value={name}
      />
      <br />
      <Textbox
        id="phone"
        label="Phone Number"
        onChange={(value) => setPhone(value)}
        size={14}
        value={phone}
      />
      <br />
      <Textbox
        id="email"
        label="Email Address"
        onChange={(value) => setEmail(value)}
        size={40}
        value={email}
      />
      <br />
      <Textarea
        characterLimit={300}
        columns={60}
        errorMessage={error}
        id="talentArea"
        label="Talent Area"
        onChange={(value) => setTalentArea(value)}
        required
        value={talentArea}
      />
      <br />
      <Button
        buttonShape={SHAPES.RECT}
        color={BUTTON_COLORS.GRAY}
        name="Send"
        onClick={() => validateAndSubmit()}
        type="Submit"
      >
        Send
      </Button>
      {Boolean(postStatus || error) && (
        <PostSubmitStatusMessage
          inputErrorMessage={error}
          postStatus={postStatus}
          responseError={responseError}
        />
      )}
      {showThanksMessage && (
        <p className="message-sent-notification">Your message was sent!</p>
      )}
    </>
  );
}
