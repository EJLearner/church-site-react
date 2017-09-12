import React from 'react';

import RegistrationLanding from './RegistrationLanding.js';

import leftPicture from './ccregpicture.png';

const CcRegistrationLanding = (props) => {
  return (
    <RegistrationLanding
      imgPath={leftPicture}
      onClickAttend={() => {console.log('Attending Button Clicked')}}
      onClickVolunteer={() => {console.log('Volunteering Button Clicked')}}
      type={RegistrationLanding.TYPES.CHILDRENS_CHURCH}
    />
  );
};

export default CcRegistrationLanding;
