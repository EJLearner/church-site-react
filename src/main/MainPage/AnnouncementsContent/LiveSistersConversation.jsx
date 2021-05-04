import React from 'react';

import liveSistersConventionFlyer from '../../../assets/main/images/announcement-live-virtual-sisters-convention.jpg';
import {isoTimeHasPassed} from '../../../utils/dateTimeUtils';

export function LiveSistersConversation() {
  if (!isoTimeHasPassed('2021-04-03T12:00:00')) {
    const altText =
      'Live Virtual Sister’s Conversation: Overcoming pandemic fatigue feating Eva Sapp, Mary Fisher ' +
      'Keyza Turner, Evelyn Sapp and Angela ' +
      'Fisher ' +
      'Date: April 3rd at 11:00 am. Registration is required ' +
      'Send registration information to:phenomenally2020@gmail.com Meeting ID:823 2106 2049 - PASSWORD: 989224 ' +
      'Phone contact numbers (443) 723-8281 or (443) 610-4930 for more';
    return (
      <div className="content" key="live-virtual-sisters">
        <h2>Live Virtual Sisters Conversation</h2>
        <img alt={altText} src={liveSistersConventionFlyer} />
      </div>
    );
  }

  return null;
}
