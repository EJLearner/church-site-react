import React from 'react';
import PropTypes from 'prop-types';

import './RegistrationLanding.css';

const types = {
  VACATION_BIBLE: 'Vacation Bible School',
  CHILDRENS_CHURCH: 'Children’s Church'
};

const RegistrationLanding = props => {
  return (
    <div className="registration-landing">
      <div
        className="left-side"
        style={{backgroundImage: `url(${props.imgPath})`}}
      >
        <div className="sentence">
          <span className="first-part">Register </span>
          <span className="rest-of-sentence">for a Class</span>
        </div>
        <div className="button-div">
          {props.onClickAdultAttend && (
            <>
              <button onClick={props.onClickAdultAttend}>
                I want to attend {props.type}.
              </button>
              <br />
            </>
          )}
          <button onClick={props.onClickChildAttend}>
            I want my child to attend {props.type}.
          </button>
        </div>
      </div>
      <div className="right-side">
        <div className="sentence">
          <span className="first-part">Sign Up </span>
          <span className="rest-of-sentence">to Volunteer</span>
        </div>
        <div className="button-div">
          <button onClick={props.onClickVolunteer}>
            I want to be a volunteer.
          </button>
        </div>
      </div>
    </div>
  );
};

RegistrationLanding.propTypes = {
  imgPath: PropTypes.string,
  onClickAdultAttend: PropTypes.func,
  onClickChildAttend: PropTypes.func.isRequired,
  onClickVolunteer: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(types))
};

RegistrationLanding.TYPES = types;

export default RegistrationLanding;
