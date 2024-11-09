import {format, add} from 'date-fns';
import {Fragment} from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import {bibleComFormattedVerses} from '../stores/dailyVersesYear';
import weeklyMeditationsYear from '../stores/weeklyMeditationsYear';
import constants from '../utils/constants';
import {getStartOfWeek, getSundayOfYearIndex} from '../utils/dateTimeUtils';

import MainMenubar from './commonComponents/MainMenubar';
import Verse from './commonComponents/Verse';

const StyledMeditationsPage = styled.div`
  background-color: var(--gossamer-veil);
  min-height: 100%;
  .content {
    color: var(--text-on-light-background);
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    padding: 0 var(--gutter-space) var(--page-bottom-padding)
      var(--gutter-space);

    .daily-scriptures {
      flex: 0 1 40%;

      p {
        margin: 4px 0;
      }
    }

    .weekly-meditation {
      flex: 0 2 50%;
    }

    h1 {
      border: 2px solid var(--charcoal-grey);
      border-left: none;
      border-right: none;
      font-weight: normal;
      margin-bottom: 14px;
      text-align: center;
      text-transform: uppercase;
    }

    h3 {
      text-transform: uppercase;
      margin: 16px 0 2px 0;
      font-weight: normal;
      font-family: var(--sans-serif);
    }
  }
`;

const getCurrentWeekDates = () => {
  const jsSundayTime = getStartOfWeek();

  const thisWeeksDates = [];
  for (let i = 0; i < 7; i++) {
    const jsDate = add(jsSundayTime, {days: i});
    const standardDate = format(
      jsDate,
      constants.DATE_FNS_INTERNAL_DATE_FORMAT,
    );

    const dayOfWeek = format(jsDate, 'EEEE');

    thisWeeksDates.push({date: standardDate, day: dayOfWeek});
  }

  return thisWeeksDates;
};

const currentWeekDates = getCurrentWeekDates();

function getVersesContent() {
  const sundayDate = currentWeekDates[0].date;
  const sundayOfYearIndex = getSundayOfYearIndex(sundayDate);
  if (!bibleComFormattedVerses[sundayOfYearIndex]) {
    return (
      <>
        <h2>Content unavailable</h2>
        <p>Sorry, no verses are available at this time.</p>
      </>
    );
  }

  const verses = currentWeekDates.map(({date, day}, index) => {
    const {verse, referenceText} =
      bibleComFormattedVerses?.[sundayOfYearIndex]?.[index] ?? {};

    return (
      <Fragment key={date}>
        <h3 id={day}>{day}</h3>
        <Verse
          date={date}
          key={date}
          passage={verse}
          referenceText={referenceText}
        />
      </Fragment>
    );
  });

  return <div>{verses}</div>;
}

function renderMeditationContent() {
  const sundayOfYearIndex = getSundayOfYearIndex(currentWeekDates[0].date);
  // the array doesn't seem to be perfectly setup for the year, this should be fixed
  // until then, the offset is needed for this calendar and should be checked for the new year
  const indexToUse = sundayOfYearIndex - 2;

  const {subTitle: subTitle, content: content} =
    weeklyMeditationsYear[indexToUse] || {};

  if (content) {
    return (
      <>
        <h3>{subTitle}</h3>
        {content}
      </>
    );
  }

  return (
    <>
      <h2>Content unavailable</h2>
      Sorry, no weekly meditation is available at this time.
    </>
  );
}

export default function MeditationsPage() {
  return (
    <StyledMeditationsPage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <div className="daily-scriptures">
          <h1>Daily Scripture Readings</h1>
          {getVersesContent()}
        </div>
        <div className="weekly-meditation">
          <h1>Weekly Meditation</h1>
          {renderMeditationContent()}
        </div>
      </div>
    </StyledMeditationsPage>
  );
}
