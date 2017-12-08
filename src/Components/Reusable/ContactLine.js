import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Contact.css';

// TODO: Use smoother email protection method
const ADRESSES = {
  YEARGIN: {
    href:
      'http://www.google.com/recaptcha/mailhide/d?k=01AeeFKaRTJojiB4jbL06IaQ==&c=bOreb2uq7fe3QB4HELOcLSuyAGLNyCaIUh6AdGMTUKM=',
    onClickAddress:
      'http://www.google.com/recaptcha/mailhide/d?k\x3d01AeeFKaRTJojiB4jbL06IaQ\x3d\x3d\x26c\x3dbOreb2uq7fe3QB4HELOcLSuyAGLNyCaIUh6AdGMTUKM\x3d',
    firstChar: 't',
    domain: '@comcast.net'
  },
  RSMITH: {
    href:
      'http://www.google.com/recaptcha/mailhide/d?k=01BLYSTE3P_hFb922ei8-IQQ==&c=vGtMMo7C3pMp72ZHiweKgemyjfDf0ysC2boqbw-BQIk=',
    onClickAddress:
      'http://www.google.com/recaptcha/mailhide/d?k\x3d01BLYSTE3P_hFb922ei8-IQQ\x3d\x3d\x26c\x3dvGtMMo7C3pMp72ZHiweKgemyjfDf0ysC2boqbw-BQIk\x3d',
    firstChar: 'r',
    domain: '@aol.com',
    displayName: 'Deacon Raqcquel B. Smith'
  },
  JBT: {
    href:
      'http://www.google.com/recaptcha/mailhide/d?k=01xrVw8AIGkyDCE5et59X8Fw==&c=3sXg4urbcDzWpjRCoZMsF9OXmHTdkWH1HjKikOfssao=',
    onClickAddress:
      'http://www.google.com/recaptcha/mailhide/d?k\x3d01xrVw8AIGkyDCE5et59X8Fw\x3d\x3d\x26c\x3d3sXg4urbcDzWpjRCoZMsF9OXmHTdkWH1HjKikOfssao\x3d',
    firstChar: 'j',
    domain: '@verizon.net',
    displayName: 'Joyce Baylor-Thompson'
  }
};

const getWindowOpen = onClickAddress =>
  `window.open(
    '${onClickAddress}',
    '',
    'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300'
  );
  return false;`;

class Contact extends Component {
  render() {
    const {
      displayName,
      href,
      onClickAddress,
      title,
      firstChar,
      domain
    } = this.props.address;
    const onClick = getWindowOpen(onClickAddress);
    return (
      <div>
        Contact: {displayName ? `${displayName}, ` : null}
        <a href={href} onClick={onClick} title={title}>
          {firstChar}...{domain}
        </a>
      </div>
    );
  }
}

Contact.propTypes = {
  address: PropTypes.oneOf.isRequired
};

Contact.ADDRESSES = ADRESSES;

export default Contact;
