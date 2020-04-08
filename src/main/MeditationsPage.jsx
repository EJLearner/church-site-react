import {format, add, parseISO, startOfDay, isAfter, isBefore} from 'date-fns';
import {endOfDay} from 'date-fns/esm';
import React, {useState} from 'react';
import styled from 'styled-components';

import Verse from '../common/components/Verse';
import routePaths from '../routePaths';
import {bibleComFormattedVerses} from '../stores/dailyVerses';
import weeklyMeditations from '../stores/weeklyMeditations';
import constants from '../utils/constants';
import {getStartOfWeek} from '../utils/dateTimeUtils';
import {FONT_FAMILIES} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import SideMenu from './commonComponents/SideMenu';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

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

  return currentWeekDates.map(({date, day}) => {
    const {verse, referenceText} = bibleComFormattedVerses[date];

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
}

const noContentMessage = (
  <>
    <h2>Content unavailable</h2>
    <p>Sorry, no content is available this week.</p>
  </>
);

const goodFridayMeditation = (
  <>
    <p>
      As you know, due to the coronavirus, and the guidelines that have been put
      in place for our safety, we will not be able to participate in our annual
      Good Friday service. However, that does not mean that we will not be able
      to participate in this very special day.
    </p>
    <p>
      Therefore, I am asking that we take the time on Good Friday, between the
      hours of 12:00 noon and 3:00 pm to reflect on the seven last words of
      Christ, what those words mean to us and spend some time in prayer. If
      there are those of you who are still working during the day in an office
      or at home at the time given above, I am asking that you participate in
      this time of meditation and prayer between the hours of 6:00 pm and 9:00
      pm. Should there is another time period other than to two listed above,
      please feel free spend time during the day, that is convenient for you. My
      concern is that you participate in this special session on Good Friday no
      matter the time.
    </p>
    In order for us to be a part of this observance,
    <ol>
      <li>
        Begin by taking a few moments to be still and after the moments of
        stillness, ask God to be with you as you read the Seven Last Words of
        Christ. Ask Him to reveal what He desires to share with you.
      </li>
      <li>
        Then begin to read the text of the Seven Last Words. After reading of
        each of the text, take the time to meditate and reflect over what you
        have read. Think about what each word is saying to you and what it means
        to you. If you happen to be sharing your time with someone else, share
        your thoughts with them. There is value in hearing what others have to
        say and what it means to them.
        <ol type="a">
          <li>The First Word - Luke 23:33-34; </li>
          <li>The Second Word – Luke 23:39-43; </li>
          <li>The Third Word – John 19:25-27; </li>
          <li>The Fourth Word – Mark 15:33-34: </li>
          <li>The Fifth Word – John 19:28; </li>
          <li>The Sixth Word – John 19:30; </li>
          <li>The Seventh Word – Luke 23:44-46</li>
        </ol>
      </li>
      <li>
        When you have completed reflecting on all seven of the last words, spend
        some time in prayer. Ask God to reveal to you what He wants you to know.
        Share with God what the words mean to you and how they can be helpful to
        you in your life.
      </li>
    </ol>
    <p>
      I urge all of us to take the time to participate in this time of personal
      worship and growth. I believe that it will enable us to take that next
      step forward in our spiritual growth as member of the body of Christ.
    </p>
    <p>
      Although Good Friday is filled with agony and rejection, scorn and pain,
      it ultimately reveals the matchless glory that is God’s and God’s alone.
    </p>
    <p>
      May God bless you as you spend this time with Jesus on the cross at
      Calvary.
    </p>
  </>
);

const getMeditationForDate = date => {
  // remove code starting here after 2020-04-12
  const beginningOfThursday = startOfDay(parseISO('2020-04-09'));
  const endOfSaturday = endOfDay(parseISO('2020-04-11'));
  const now = new Date();

  const showGoodFridayMessage =
    isAfter(now, beginningOfThursday) && isBefore(now, endOfSaturday);

  if (showGoodFridayMessage) {
    const subTitle =
      'GOOD FRIDAY: A TIME OF MEDITATION, REFLECTION AND PRAYER!!';

    return (
      <>
        <h2>
          Weekly Meditation <span className="subtitle">{subTitle}</span>
        </h2>
        {goodFridayMeditation}
      </>
    );
  }
  // and ending here

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
        <MainMenubar />
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
                  onClick={id => setContentId(id)}
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
