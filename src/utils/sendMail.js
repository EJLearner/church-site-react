function sendMail(recipient, message) {
  // TODO: actually send message
  // Should always include time message was sent and that the message originates from the city temple website

  /* eslint-disable no-console */
  console.log('message\n', message);
  console.log('recipient\n', recipient);
  /* eslint-enable no-console */
}

const RECIPIENTS = {CONNECT: 'CONNECT'};

export {RECIPIENTS};
export default sendMail;
