import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Contact.css';

// TODO: Use forms instead of google method and stop rendering null
const ADRESSES = {
  AJONES: {},
  DMORTON: {},
  JBT: {displayName: 'Joyce Baylor-Thompson'},
  LALEXANDER: {},
  MJENKINS: {},
  RSMITH: {displayName: 'Deacon Racquel B. Smith'},
  PWARD: {displayName: 'Patricia Shearn-Ward'},
  YEARGIN: {}
};

class Contact extends Component {
  render() {
    const {onClickAddress, title} = this.props.address;
    return null;
  }
}

Contact.propTypes = {
  address: PropTypes.object.isRequired
};

Contact.ADDRESSES = ADRESSES;

export default Contact;
