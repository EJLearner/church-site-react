import {format, add} from 'date-fns';
import React, {useState} from 'react';
import styled from 'styled-components';

import routePaths from '../routePaths';
import {bibleComFormattedVerses} from '../stores/dailyVerses';
import weeklyMeditations from '../stores/weeklyMeditations';
import constants from '../utils/constants';
import {getStartOfWeek} from '../utils/dateTimeUtils';
import {FONT_FAMILIES} from '../utils/styleVariables';

import AboveContentLinks from './commonComponents/AboveContentLinks';
import BackToTop from './commonComponents/BackToTop';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';
import Verse from './commonComponents/Verse';

const StyleWrapper = styled.div`
  h2 {
    margin-bottom: 0;

    .subtitle {
      display: block;
      font-size: 16px;
      text-transform: none;
    }
  }

  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }

  h3:first-of-type {
    margin-top: 0;
  }
`;

const IDS = {
  MEDITATION: 'meditation',
  VERSES: 'verses'
};

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
    return noContentMessage;
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

  return (
    <div>
      {verses}
      <BackToTop />
    </div>
  );
}

const noContentMessage = (
  <>
    <h2>Content unavailable</h2>
    <p>Sorry, no content is available this week.</p>
  </>
);

const getMeditationForDate = (date) => {
  const weeklyMeditationInfo = weeklyMeditations[date];

  if (weeklyMeditationInfo) {
    const {subTitle, content} = weeklyMeditationInfo;

    return (
      <>
        <h2>
          Weekly Meditation <span className="subtitle">{subTitle}</span>
        </h2>
        {content}
      </>
    );
  }
};

const allContentData = [
  {
    getContent: () => getMeditationForDate(currentWeekDates[0].date),
    id: IDS.MEDITATION,
    title: 'Weekly Meditation'
  },
  {
    getContent: getVersesContent,
    id: IDS.VERSES,
    title: 'Daily Scripture Readings',
    subLinks: currentWeekDates.map(({day}) => ({title: day, elementId: day}))
  }
];

export default function MeditationsPage() {
  const [contentId, setContentId] = useState(IDS.MEDITATION);
  const {getContent, title} = allContentData.find(({id}) => id === contentId);
  const content = getContent() || noContentMessage;

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <TopInfoBoxWrapper>
          <TopInfoBox>
            <h1>Scriptures &amp; Meditation</h1>
            <p>
              As with any relationship, in order to cultivate and nurture a
              relationship with God, we must spend time. We spend time with God
              when we read His word and meditate on it while listening for the
              still, quiet voice. Join us in participating in our daily
              devotional and weekly meditations as we continue to strengthen our
              relationship with God through our savior Jesus Christ.
            </p>
          </TopInfoBox>
          <ContentAndSubCompassWrapper>
            <AboveContentLinks
              pagePath={routePaths.MAIN_MEDITATIONS}
              pageTitle="Meditation and Scriptures"
              subPageTitle={title}
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={allContentData}
                  onClick={(id) => setContentId(id)}
                  title="Meditation and Scriptures"
                />
              </ContentLeftSide>
              <ContentWrapper>{content}</ContentWrapper>
              <ContentRightSide />
            </ContentAndSides>
          </ContentAndSubCompassWrapper>
        </TopInfoBoxWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}
