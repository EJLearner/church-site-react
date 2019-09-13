import {Component} from 'react';

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
    return null;
  }
}

Contact.ADDRESSES = ADRESSES;

export default Contact;
