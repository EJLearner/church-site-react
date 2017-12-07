import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Contact.css';

class Contact extends Component {
  render() {
    return (
      <div>
        Contact: <a href={this.props.email}>{this.props.name}</a>
      </div>
    );
  }
}

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Contact;
