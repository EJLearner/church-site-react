import React, {useState} from 'react';

import Button, {
  SHAPES,
  BUTTON_COLORS
} from '../ce/components/Reusable/Button/Button';
import Textarea from '../common/components/Textarea';
import Textbox from '../common/components/Textbox';

export default function GedPageContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <p>
        Call (443) 800-9231 Monday–Friday between 9 am - 5 pm or submit the
        form.
      </p>
      <Textbox
        id="name"
        label="Name"
        onChange={value => setName(value)}
        size={40}
        value={name}
      />
      <br />
      <Textbox
        id="email"
        label="Email Address"
        onChange={value => setEmail(value)}
        size={40}
        value={email}
      />
      <br />
      <Textarea
        characterLimit={300}
        columns={60}
        id="message"
        label="Message"
        onChange={value => setMessage(value)}
        required
        value={message}
      />
      <br />
      <Button
        buttonShape={SHAPES.RECT}
        color={BUTTON_COLORS.GRAY}
        name="Send"
        type="Submit"
      >
        Send
      </Button>
    </>
  );
}
