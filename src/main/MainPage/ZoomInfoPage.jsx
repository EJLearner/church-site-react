import React from 'react';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';
import MainMenubar from '../MainMenubar';
import ContentAndSubCompassWrapper from '../commonComponents/ContentAndSubCompassWrapper';
import StandardPageWrapper from '../commonComponents/StandardPageWrapper';

const FIELD_IDS = Object.freeze({
  titleSearchId: 'title-search',
  preacherSearchId: 'preacher-search',
  dateSearchId: 'date-search',
  scriptureSearchId: 'scripture-search'
});

export const initialSearchInfo = {
  [FIELD_IDS.titleSearchId]: '',
  [FIELD_IDS.preacherSearchId]: '',
  [FIELD_IDS.dateSearchId]: '',
  [FIELD_IDS.scriptureSearchId]: ''
};

const StyleWrapper = styled.div`
  padding: 1em 0;

  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  h3 {
    color: ${LOGICAL_COLORS.STANDARD_TEXT};
    font-weight: bold;
  }

  .highlighted {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    font-weight: bolder;
  }
`;

const ZoomInfoPage = () => {
  return (
    <StandardPageWrapper>
      <MainMenubar />
      <ContentAndSubCompassWrapper>
        <StyleWrapper>
          <h2>Zoom Instructions</h2>
          <h3>To join Zoom Meeting using video conferencing:</h3>
          <ol>
            <li>
              Click or press the link:
              <a href="https://us02web.zoom.us/j/6234535359?pwd=WTJxREJid3hVREFla3RPbTdoZWo3Zz09">
                https://us02web.zoom.us/j/6234535359?pwd=WTJxREJid3hVREFla3RPbTdoZWo3Zz09
              </a>
            </li>
            <li>A page will appear with a “Launch Meeting” button.</li>
            <li>Click “Launch Meeting” </li>
            <li>
              Click “Join from Your Browser” if you don’t already have the Zoom
              app installed on your device.
            </li>
            <li>You will be joined into the Zoom Meeting.</li>
          </ol>
          <h3>To join Zoom Meeting using your telephone:</h3>
          <ol>
            <li>
              Dial the toll-free number{' '}
              <span className="highlighted">1 (877) 853-5257.</span>
            </li>
            <li>
              When prompted, enter the Meeting ID:{' '}
              <span className="highlighted">623 453 5359#</span>.
            </li>
            <li>
              When prompted, enter the Passcode:{' '}
              <span className="highlighted">966703#</span>.
            </li>
            <li>You will be joined into the Zoom Meeting.</li>
          </ol>
          <h3>To join Zoom Meeting using an iPhone One-Tap Mobile Link:</h3>
          <ol>
            <li>
              Locate the blue One tap mobile link in the Zoom Meeting Invitation
              email sent from the church.
            </li>
            <li>
              Tap the link and it will automatically dial the Zoom phone number,
              Meeting ID, and Passcode for you.
            </li>
            <li>You will be joined into the Zoom Meeting.</li>
          </ol>
        </StyleWrapper>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default ZoomInfoPage;
