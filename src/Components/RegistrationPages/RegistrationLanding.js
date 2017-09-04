import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import ceLogo from './cesquare.png'

import './RegistrationLanding.css';

const types = {
  VACATION_BIBLE: 'Vacation Bible School',
  CHILDRENS_CHURCH: 'Children’s Church'
}

const RegistrationLanding = (props) => {
  return (
    <div className="registration-landing">
      <div className="left-side">
        <div className="sentence">
          <span className="first-part">Register </span>
          <span className="rest-of-sentence">for a Class</span>
        </div>
        <button onClick={props.onClickAttend}>I want to attend {props.type}.</button>
      </div>
      <div className="right-side">
        <div className="sentence">
          <span className="first-part">Sign Up </span>
          <span className="rest-of-sentence">to Volunteer</span>
        </div>
        <button onClick={props.onClickVolunteer}>I want to be a volunteer.</button>
      </div>
    </div>
  );
};

RegistrationLanding.propTypes = {
  type: PropTypes.oneOf(_.values(types)),
  onClickAttend: PropTypes.func.isRequired,
  onClickVolunteer: PropTypes.func.isRequired
};

RegistrationLanding.TYPES = types;


export default RegistrationLanding;
