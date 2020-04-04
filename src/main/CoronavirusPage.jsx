import React, {useState} from 'react';
import styled from 'styled-components';

import coronaVirusImage from '../assets/main/images/coronavirus.png';
import yearginPicture from '../assets/main/images/grady-yeargin.jpg';
import routePaths from '../routePaths';
import {COLORS} from '../utils/styleVariables';

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
  .yeargin-picture {
    float: left;
    width: 200px;
    height: auto;
    margin: 0 1em 1em 0;
  }
  em {
    color: ${COLORS.RED};
    font-weight: bold;
  }
  .corona-virus-image {
    width: 300px;
  }
  .mid-sentence {
    color: #c00000;
  }
`;
const IDS = {
  IF_INFECTED: 'if-sick',
  INFO: 'info',
  MEDITATION: 'meditation',
  PROCEDURE_CHANGES: 'church-procedure-changes'
};

const image = (
  <img
    alt="Coronavirus"
    className="corona-virus-image"
    src={coronaVirusImage}
  />
);

const meditation = (
  <div>
    <h2>
      <i>“A Meditation for these times!”</i>
    </h2>
    <img alt="Grady Yeargin" className="yeargin-picture" src={yearginPicture} />
    <p>
      In the 6th verse of the 46th Psalm, the pslamist declares that{' '}
      <em>“The nations are in chaos, and their kingdoms crumble.”</em> These
      words reflect the times in which we are presently living. Chaos has grown
      out of the present pandemic from which the entire world is suffering. The
      White House has been in chaos since the last election, and it has worsened
      since the emergence of this pandemic. Stores have been in chaos as
      shoppers have felt the need to stock-up on food and other necessities. And
      there are those who believe that this pandemic is nothing but a hoax
      cooked up by the Democratic Party.
    </p>
    <p>
      However, there is a word from the 10th verse of that 46th Psalm that is
      worthy of serious consideration. According to that text, God issues the
      following command: <em>“Be still and know that I am God.”</em>
    </p>
    <p>
      I do not believe that the God we serve is the author or creator of chaos
      or suffering. We do enough of that without His help. Instead, the God I
      know tends to involve Himself in the chaos and suffering we create and
      cause, in order to transform it into healing and peace. I believe it is
      for this reason that God commands us to{' '}
      <em>“Be still and know that I am God!”</em> Make no mistake about it: God
      works in mysterious ways.
    </p>
    <p>
      Our lives have become so hectic, so fast-paced, so demanding, and yes, so
      chaotic that we lose our sense of who we are. I think it so like God to
      use this present pandemic and chaos to get our attention; to give us a
      sense of what real life and living is; to come to experience the peace
      that passeth all understanding. So, God, in His most unpredictable way,
      uses “social distancing” to get us to see the chaos for what it is and
      what it can do. Now, we have little or no choice but to separate ourselves
      from the hustle and bustle of this life and begin to get our bearings
      regarding who God is and what He is able to do. Now, we are being forced
      to be still so that we cannot just bring a halt to this raging virus, but
      so that we can take the time to know the God who is indeed God; to
      recognize that He is God and God alone. In times like this, He is our
      refuge and strength; in times like this, He is our very present help in
      the time of trouble. Therefore, we will not fear whatever may come our
      way.
    </p>
  </div>
);

const preventingSickness = (
  <>
    {image}
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
    {image}
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
      <b>Cover your coughts and snezes</b>
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
    {image}
    <h2>Responding to the Coronavirus Pandemic</h2>
    <div>
      <h3>
        <b>
          This is an emerging, rapidly evolving situation. We will provide
          updated information regarding our services, events, and other
          protocols as necessary. Please accept the following guidelines and
          help us protect the vulnerable members of our congregation.
        </b>
      </h3>
      <p>
        <b>Church Service</b>
      </p>
      <div>
        <ul>
          <li>
            Church service is cancelled until further notice. Please visit our
            website and go to “WATCH”, visit our Facebook page, or go to our
            church’s YouTube channel in order to view the Sunday sermons.
          </li>
          <li>
            We will participate in a virtual Communion on each first Sunday. You
            can find the Church Vision and Church Covenant on the “About Us”
            page.
          </li>
        </ul>
      </div>
      <p>
        <b>Ministry Meetings</b>
      </p>
      <div>
        <ul>
          <li>
            We are encouraging ministries to conduct meetings remotely using a{' '}
            <b>
              <span className="mid-sentence">
                church-provided ministry conference line
              </span>
            </b>
            . Contact Emily Tilghman at (443) 520-8162 or kerrtilghman@gmail.com
            to schedule your use of the conference line to avoid conflicts.
            <ul>
              <li>Dial-in number: (425) 436-6358</li>
              <li>Participant code: 581086</li>
              <li>Host PIN: 6845</li>
            </ul>
          </li>
          <li>
            Please see April Jones if you are interested in video conferencing
            for your meetings.
          </li>
        </ul>
      </div>
      <p>
        <b>Tithing &amp; Offering</b>
      </p>
      <div>
        <ul>
          <li>
            Please continue to send your tithes and offering to your church!
            While we can no longer accept offering at church, you can send us
            your offering by:
            <ul>
              <li>
                Church website: Make your tithing, offering, or donation on-line
                by visiting our{' '}
                <a href="https://www.thecitytemple.org/giving/">
                  <b>Giving Page.</b>
                </a>{' '}
              </li>
              <li>
                Mail to church: 317 Dolphin Street, Baltimore, MD 21217 (please,
                no cash)
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <p>
        <b>Notifications &amp; Cancellations</b>
      </p>
      <div>
        <ul>
          <li>
            We will communicate updates using robocalls, emails, website
            updates, radio, and tv.
          </li>
          <li>
            If your contact information has changed in the last 6 months, please
            contact Sis. Marshell Jenkins or Dea. Racquel Smith.
          </li>
          <li>Lenten services have been cancelled.</li>
          <li>
            All church events scheduled for April and May have been postponed
            &mdash; new dates <b>to be determined</b>.
          </li>
          <li>
            Please do not submit requests for any new events taking place before
            August.
          </li>
        </ul>
      </div>
    </div>
  </>
);

const contentData = [
  {
    id: IDS.PROCEDURE_CHANGES,
    content: procedureChangesContent,
    title: 'City Temple’s Response to COVID-19'
  },
  {
    content: meditation,
    id: IDS.MEDITATION,
    title: 'A Meditation from the pastor'
  },
  {id: IDS.INFO, content: preventingSickness, title: 'Preventing sickness'},
  {
    id: IDS.IF_INFECTED,
    content: ifInfectedContent,
    title: 'What to do if infected'
  }
];

export default function CoronavirusPage() {
  const [contentId, setContentId] = useState(contentData[0].id);

  const {content, title} = contentData.find(({id}) => id === contentId);

  return (
    <StyleWrapper>
      <StandardPageWrapper>
        <MainMenubar />
        <TopInfoBoxWrapper>
          <TopInfoBox>
            <h1>In Response to the Coronavirus Pandemic</h1>
            <p>
              By now, we are fully aware of the Coronavirus or COVID-19
              pandemic. It has radically changed our daily lives. It is clear
              that one of the most important actions each of us can take at this
              time is to participate in “social distancing,” which can slow down
              and eventually stop the spread of this dangerous virus.
            </p>
            <p>
              Therefore, in keeping with the principle precept of bioethics to
              “First, do no harm” and adhering to the State of Emergency
              declared by Governor Hogan and the Center for Disease Control, we
              are cancelling our weekly worship service until further notice. I
              believe this is in keeping with the second greatest commandment to
              <i>“Love your neighbor as you love yourself”</i> (Mark 20:31). By
              so doing, we lessen the possibility of contracting and/or
              spreading the virus to others.{' '}
            </p>
            <p>
              {' '}
              We will be sending out further information in the days to come
              regarding what we will be able to do to keep our church family
              informed.
            </p>
          </TopInfoBox>
          <ContentAndSubCompassWrapper>
            <AboveContentLinks
              pagePath={routePaths.MAIN_CORONAVIRUS}
              pageTitle="Coronavirus"
              subPageTitle={title}
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={contentData}
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
    </StyleWrapper>
  );
}
