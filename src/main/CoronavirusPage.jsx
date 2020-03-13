import React, {useState} from 'react';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import MainMenubar from './MainMenubar';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';
import TopInfoBox from './commonComponents/TopInfoBox';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import routePaths from '../routePaths';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import ContentRightSide from './commonComponents/ContentRightSide';
import SideMenu from './commonComponents/SideMenu';

const IDS = {
  INFO: 'info',
  IF_INFECTED: 'if-sick',
  PROCEDURE_CHANGES: 'church-procedure-changes'
};

const menuData = [
  {id: IDS.INFO, title: 'Preventing sickness'},
  {id: IDS.IF_INFECTED, title: 'What to do if infected'},
  {
    id: IDS.PROCEDURE_CHANGES,
    title: 'What the church is doing differently'
  }
];

const infoContent = (
  <>
    <h2>Preventing Sickness</h2>
    <p>
      <b>
        There is currently no vaccine to prevent coronavirus disease 2019
        (COVID-19). The best way to prevent illness is to avoid being exposed to
        this virus. However, as a reminder, CDC always recommends everyday
        preventive actions to help prevent the spread of respiratory diseases,
        including:
      </b>
    </p>
    <ul>
      <li>Avoid close contact with people who are sick.</li>
      <li>Avoid touching your eyes, nose, and mouth.</li>
      <li>Stay home when you are sick.</li>
      <li>
        Cover your cough or sneeze with a tissue, then throw the tissue in the
        trash.
      </li>
      <li>
        Clean and disinfect frequently touched objects and surfaces using a
        regular household cleaning spray or wipe.
      </li>
      <li>
        Follow CDC’s recommendations for using a facemask.
        <ul>
          <li>
            CDC does not recommend that people who are well wear a facemask to
            protect themselves from respiratory diseases, including COVID-19.
          </li>
        </ul>
        <ul>
          <li>
            Facemasks should be used by people who show symptoms of COVID-19 to
            help prevent the spread of the disease to others. The use of
            facemasks is also crucial for health workers and people who are
            taking care of someone in close settings (at home or in a health
            care facility).
          </li>
        </ul>
      </li>
      <li>
        Wash your hands often with soap and water for at least 20 seconds,
        especially after going to the bathroom; before eating; and after blowing
        your nose, coughing, or sneezing.
        <ul>
          <li>
            If soap and water are not readily available, use an alcohol-based
            hand sanitizer with at least 60% alcohol. Always wash hands with
            soap and water if hands are visibly dirty.
          </li>
        </ul>
      </li>
    </ul>
    <p>
      For information about handwashing, see{' '}
      <a href="http://www.cdc.gov/handwashing/index.html">
        <b>CDC’s Handwashing website.</b>
      </a>
    </p>
    <p>
      For information specific to healthcare, see{' '}
      <a href="https://www.cdc.gov/handhygiene/index.html">
        <b>CDC’s Hand Hygiene in Healthcare Settings.</b>
      </a>
    </p>
    <p>
      These are everyday habits that can help prevent the spread of several
      viruses. CDC does have specific guidance for travelers.
    </p>
  </>
);

const ifInfectedContent = (
  <>
    <h2>
      What to do if you are sick with the coronavirus disease 2019 (COVID-19)
    </h2>
    <p>
      <b>
        If you are sick with COVID-19 or suspect you are infected with the virus
        that causes COVID-19, follow the steps below to help prevent the disease
        from spreading to people in your home and community.
      </b>
    </p>
    <b>Stay home except to get medical care</b>
    <p>
      You should restrict activities outside your home, except for getting
      medical care. Do not go to work, school, or public areas. Avoid using
      public transportation, ride-sharing, or taxis.
    </p>
    <b>Separate yourself from other people and animals in your home</b>
    <p>
      <b>People: </b>As much as possible, you should stay in a specific room and
      away from other people in your home. Also, you should use a separate
      bathroom, if available.
    </p>
    <p>
      <b>Animals: </b>Do not handle pets or other animals while sick. See
      <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html#animals">
        <b> COVID-19 and Animals for more information.</b>
      </a>
    </p>
    <p>
      <b>Call ahead before visiting your doctor</b>
    </p>
    <p>
      If you have a medical appointment, call the healthcare provider and tell
      them that you have or may have COVID-19. This will help the healthcare
      provider’s office take steps to keep other people from getting infected or
      exposed.
    </p>
    <p>
      <b>Wear a facemask</b>
    </p>
    <p>
      You should wear a facemask when you are around other people (e.g., sharing
      a room or vehicle) or pets and before you enter a healthcare provider’s
      office. If you are not able to wear a facemask (for example, because it
      causes trouble breathing), then people who live with you should not stay
      in the same room with you, or they should wear a facemask if they enter
      your room.
    </p>
    <p>
      <b and coughs Cover sneezes your />
    </p>
    <p>
      Cover your mouth and nose with a tissue when you cough or sneeze. Throw
      used tissues in a lined trash can; immediately wash your hands with soap
      and water for at least 20 seconds or clean your hands with an
      alcohol-based hand sanitizer that contains at least 60 to 95% alcohol,
      covering all surfaces of your hands and rubbing them together until they
      feel dry. Soap and water should be used preferentially if hands are
      visibly dirty.
    </p>
    <p>
      <b>Avoid sharing personal household items</b>
    </p>
    <p>
      You should not share dishes, drinking glasses, cups, eating utensils,
      towels, or bedding with other people or pets in your home. After using
      these items, they should be washed thoroughly with soap and water.
    </p>
    <p>
      <b>Clean your hands often</b>
    </p>
    <p>
      Wash your hands often with soap and water for at least 20 seconds. If soap
      and water are not available, clean your hands with an alcohol-based hand
      sanitizer that contains at least 60% alcohol, covering all surfaces of
      your hands and rubbing them together until they feel dry. Soap and water
      should be used preferentially if hands are visibly dirty. Avoid touching
      your eyes, nose, and mouth with unwashed hands.
    </p>
    <p>
      <b>Clean all “high-touch” surfaces every day</b>
    </p>
    <p>
      High touch surfaces include counters, tabletops, doorknobs, bathroom
      fixtures, toilets, phones, keyboards, tablets, and bedside tables. Also,
      clean any surfaces that may have blood, stool, or body fluids on them. Use
      a household cleaning spray or wipe, according to the label instructions.
      Labels contain instructions for safe and effective use of the cleaning
      product including precautions you should take when applying the product,
      such as wearing gloves and making sure you have good ventilation during
      use of the product.
    </p>
    <p>
      <b>Monitor your symptoms</b>
    </p>
    <p>
      Seek prompt medical attention if your illness is worsening (e.g.,
      difficulty breathing). Before seeking care, call your healthcare provider
      and tell them that you have, or are being evaluated for, COVID-19. Put on
      a facemask before you enter the facility. These steps will help the
      healthcare provider’s office to keep other people in the office or waiting
      room from getting infected or exposed.
    </p>
    <p>
      Ask your healthcare provider to call the local or state health department.
      Persons who are placed under active monitoring or facilitated
      self-monitoring should follow instructions provided by their local health
      department or occupational health professionals, as appropriate.
    </p>
    <p>
      If you have a medical emergency and need to call 911, notify the dispatch
      personnel that you have, or are being evaluated for, COVID-19. If
      possible, put on a facemask before emergency medical services arrive.
    </p>
    <p>
      <b>Discontinuing home isolation</b>
    </p>
    <p>
      Patients with confirmed COVID-19 should remain under home isolation
      precautions until the risk of secondary transmission to others is thought
      to be low. The decision to discontinue home isolation precautions should
      be made on a case-by-case basis, in consultation with healthcare providers
      and state and local health departments.
    </p>
    <p>
      <b>
        For more information:{' '}
        <a href="http://www.cdc.gov/COVID19">www.cdc.gov/COVID19</a>
      </b>
    </p>
  </>
);

const procedureChangesContent = (
  <>
    <h2>Church Protocol Changes</h2>
    <p>
      <h3>
        <b>
          City Temple will implement temporary changes in our morning worship
          protocol to help prevent the spread of COVID-19 and to support those
          among our congregation with compromised immune systems.
        </b>
      </h3>
      <p>
        <b>Moment of Fellowship</b>
      </p>
      <p>
        We are asking our members to remain in their pews and greet one another
        with smiles and waves in lieu of personally approaching each other to
        greet.
      </p>
      <p>
        <b>Prayer</b>
      </p>
      <p>
        During moments of cognregational prayer, members will be asked to link
        arms with one another instead of holding hands.
      </p>
      <p>
        <b>Streaming worship service</b>
      </p>
      <p>
        We are making every effort to live stream morning worship services to
        allow members with compromised immune systems to view service online if
        they are unable to participate in service in person.
      </p>
      <p>
        <b>Tithing &amp; Offering</b>
      </p>
      <p>
        If you would like to make your tithing, offering, or donation on-line,
        please visit our{' '}
        <a href="https://www.thecitytemple.org/giving/">
          <b>Giving Page.</b>
        </a>{' '}
        You can also mail checks or money orders to the church office.
      </p>
      <p>
        <h3>
          <b>The following church protocols will remain unchanged:</b>
        </h3>
      </p>
      <p>
        <b>Baptism</b>
      </p>
      <p>
        Members desiring baptism may do so each first Sunday of the month.
        Please call the church office or speak to a Diaconate member after
        church service to schedule your baptism.
      </p>
      <p>
        <b>Communion</b>
      </p>
      <p>
        We will continue to administer communion in our normal fashion. The
        Diaconate will continue to wear gloves and distribute the communion
        elements to members desiring holy communion.
      </p>
      <p>
        <b>Scheduled Activities &amp; Events</b>
      </p>
      <p>
        Unless the church is otherwise notified, please plan to attend all
        scheduled trips, activities, and events. In the event of a cancellation,
        members will be notified via robocall, email message, or on the church
        website.
      </p>
    </p>
  </>
);

const contentMap = {
  [IDS.INFO]: infoContent,
  [IDS.IF_INFECTED]: ifInfectedContent,
  [IDS.PROCEDURE_CHANGES]: procedureChangesContent
};

export default function CoronaVirusPage() {
  const [contentId, setContentId] = useState(menuData[0].id);

  const content = contentMap[contentId];

  return (
    <StandardPageWrapper>
      <MainMenubar />
      <TopInfoBoxWrapper>
        <TopInfoBox>
          <h1>Faith in the “Great Physician”</h1>
          <p>
            The enemy uses every opportunity to steal, kill, and destroy—this
            includes our hope, our peace, and our faith. However, God instructs
            us still to “cast all of your cares upon Him, for He cares for you”
            (I Peter 5:7). Faith is a spiritual muscle; and, like all muscles,
            if left dormant, it withers and atrophies. Trials and trouble remind
            us that on our own we are helpless. But thanks to God who regards
            our helpless estate! In all things, we already have the victory! Be
            an inspiration to those who are down-hearted and worried. Offer
            comfort and love to those who grieve. Pray and encourage others to
            pray for those affected by the virus. Share facts of the virus to
            stop the spread of rumors and discrimination. Exercise your faith
            through meditating on scripture, prayer, and maintaining a positive
            outlook.
          </p>
        </TopInfoBox>
        <ContentAndSubCompassWrapper>
          <AboveContentLinks
            pagePath={routePaths.MAIN_CORONAVIRUS}
            pageTitle="Coronavirus"
          />
          <ContentAndSides>
            <ContentLeftSide>
              <SideMenu
                currentId={contentId}
                menuData={menuData}
                onClick={id => setContentId(id)}
                title="Coronavirus"
              />
            </ContentLeftSide>
            <ContentWrapper>{content}</ContentWrapper>
            <ContentRightSide />
          </ContentAndSides>
        </ContentAndSubCompassWrapper>
      </TopInfoBoxWrapper>
    </StandardPageWrapper>
  );
}
