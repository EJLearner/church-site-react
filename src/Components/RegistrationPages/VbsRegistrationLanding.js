import React from 'react';

import RegistrationLanding from './RegistrationLanding.js';

import leftPicture from './vbsregpicture.png';

const VbsRegistrationLanding = props => {
  return (
    <RegistrationLanding
      imgPath={leftPicture}
      onClickAttend={() => {
        console.log('Attending Button Clicked');
      }}
      onClickVolunteer={() => {
        console.log('Volunteering Button Clicked');
      }}
      type={RegistrationLanding.TYPES.VACATION_BIBLE}
    />
  );
};

export default VbsRegistrationLanding;
