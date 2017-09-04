import React from 'react';
import RegistrationLanding from './RegistrationLanding.js';

const CcRegistrationLanding = (props) => {
  return (
    <RegistrationLanding
      onClickAttend={() => {console.log('Attending Button Clicked')}}
      onClickVolunteer={() => {console.log('Volunteering Button Clicked')}}
      type={RegistrationLanding.TYPES.CHILDRENS_CHURCH}
    />
  );
};

export default CcRegistrationLanding;
