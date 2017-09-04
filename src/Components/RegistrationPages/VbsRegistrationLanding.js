import React from 'react';
import RegistrationLanding from './RegistrationLanding.js';

const CcRegistration = (props) => {
  return (
    <RegistrationLanding
      onClickAttend={() => {console.log('Attending Button Clicked')}}
      onClickVolunteer={() => {console.log('Volunteering Button Clicked')}}
      type={RegistrationLanding.TYPES.CHILDRENS_CHURCH}
    />
  );
};

export default CcRegistration;
