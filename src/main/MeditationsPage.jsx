import {format, add} from 'date-fns';
import React from 'react';
import styled from 'styled-components';

import {bibleComFormattedVerses} from '../stores/dailyVerses';
import weeklyMeditations from '../stores/weeklyMeditations';
import constants from '../utils/constants';
import {getStartOfWeek} from '../utils/dateTimeUtils';

import Verse from './commonComponents/Verse';

const StyledMeditationsPage = styled.div`
  display: flex;
  justify-content: center;
`;

const getCurrentWeekDates = () => {
  const jsSundayTime = getStartOfWeek();

  const thisWeeksDates = [];
  for (let i = 0; i < 7; i++) {
    const jsDate = add(jsSundayTime, {days: i});
    const standardDate = format(
      jsDate,
      constants.DATE_FNS_INTERNAL_DATE_FORMAT
    );

    const dayOfWeek = format(jsDate, 'EEEE');

    thisWeeksDates.push({date: standardDate, day: dayOfWeek});
  }

  return thisWeeksDates;
};

const currentWeekDates = getCurrentWeekDates();

function getVersesContent() {
  const sundayDate = currentWeekDates[0].date;
  if (!bibleComFormattedVerses[sundayDate]) {
    return (
      <>
        <h2>Content unavailable</h2>
        <p>Sorry, no content is available this week.</p>
      </>
    );
  }

  const verses = currentWeekDates.map(({date, day}) => {
    const {verse, referenceText} = bibleComFormattedVerses?.[date] ?? {};

    return (
      <React.Fragment key={date}>
        <h3 id={day}>{day}</h3>
        <Verse
          date={date}
          key={date}
          passage={verse}
          referenceText={referenceText}
        />
      </React.Fragment>
    );
  });

  return <div>{verses}</div>;
}

export default function MeditationsPage() {
  const {subTitle: meditationSubtitle, content: meditationContent} =
    weeklyMeditations[currentWeekDates[0].date] || {};

  return (
    <StyledMeditationsPage>
      <div className="daily-scriptures">
        <h1>Daily Scripture Readings</h1>
        {getVersesContent()}
      </div>

      <div className="weekly-meditation">
        <h1>Weekly Meditation</h1>
        {meditationContent && (
          <>
            <h3>{meditationSubtitle}</h3>
            {meditationContent}
          </>
        )}
      </div>
    </StyledMeditationsPage>
  );
}
