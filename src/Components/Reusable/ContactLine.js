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
    const {href, onClickAddress, title, firstChar, domain} = this.props.address;
    const onClick = getWindowOpen(onClickAddress);
    return (
      <div>
        Contact:{' '}
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
