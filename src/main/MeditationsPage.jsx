import {startOfWeek, format, add} from 'date-fns';
import React, {useState} from 'react';
import styled from 'styled-components';

import Verse from '../common/components/Verse';
import routePaths from '../routePaths';
import {bibleComFormattedVerses} from '../stores/dailyVerses';
import constants from '../utils/constants';
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
  const jsSundayTime = startOfWeek(new Date());

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

const meditationContent = {
  '2020-03-29': (
    <>
      <h2>
        Weekly Meditation{' '}
        <span className="subtitle">
          From <i>God In Search of Man</i> by Abraham Joshua Herschel
        </span>
      </h2>

      <p>
        The world needs more than the secret holiness of individual inwardness.
        It needs more than sacred sentiments and good intentions. God asks for
        the heart because He needs the lives. It is by lives. It is by lives
        that the world will be redeemed, by lives that beat in concordance with
        God, by deeds that outbeat the finite charity of the human heart.
      </p>
      <p>
        Man’s power of action is less vague than his power of intention. And an
        action has intrinsic meaning; its value to the world is independent of
        what it means to the person performing it. The act of giving food to a
        helpless child is meaningful regardless of whether or not the moral
        intention is present. God asks for the heart, and we must sell our
        answer in terms of deeds.
      </p>
      <p>
        It would be a device of conceit, if not presumption, to insist that
        purity of the heart is the exclusive test of piety. Perfect purity is
        something we rarely know how to obtain or how to retain. No one can
        claim to have purged all the dross even from his finest desire. The self
        is finite, but selfishness is infinite. God asks for the heart, but the
        heart is oppressed with uncertainty in its own twilight. God asks for
        faith, and the heart is not sure of its own faith. It is good that there
        is a dawn of decision for the sight of the heart; deeds to objectify
        faith, definite forms to verify belief.
      </p>
      <p>
        The heart is often a lonely voice in the marketplace of living. Man may
        entertain lofty ideals and behave like the ass that, as the saying goes,
        “carries gold and eats thistles.” The problem of the soul is how to live
        nobly in an animal environment; how to persuade and train the tongue and
        the senses to behave in agreement with the insights of the soul.
      </p>
      <p>
        The integrity of life is not exclusively a thing of the heart; it
        implies more than consciousness of the moral law. The innermost chamber
        must be guarded at the uttermost outposts. Religion is not the same as
        spiritualism; what man does in his concrete, physical existence is
        directly relevant to the divine. Spirituality is the goal, not the way
        of man. In this world music is played on physical instruments, and to
        the Jew the mitsvot are the instruments on which the holy is carried
        out. If man were only mind, worship in thought would be the form in
        which to commune with god. But man is body and soul, and his goal is so
        to live that both “his heart and his flesh should sing to the living
        God.”
      </p>
    </>
  )
};

function getMeditationContent(date) {
  return meditationContent[date];
}

const noContentMessage = (
  <>
    <h2>Content unavailable</h2>
    <p>Sorry, no content is available this week.</p>
  </>
);

const allContentData = [
  {
    getContent: () => getMeditationContent('2020-03-29'),
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
