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
import coronaVirusImage from '../assets/main/images/coronavirus.png';
import yearginPicture from '../assets/main/images/grady-yeargin.jpg';

import styled from 'styled-components';

const StyleWrapper = styled.div`
  .yeargin-picture {
    float: left;
    width: 200px;
    height: auto;
    margin: 0 1em 1em 0;
  }

  .corona-virus-image {
    width: 300px;
  }
  .mid-sentence {
    color: #c00000;
  }
`;
const IDS = {
  INFO: 'info',
  IF_INFECTED: 'if-sick',
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
    <h2>The Pastor</h2>
    <img alt="Grady Yeargin" className="yeargin-picture" src={yearginPicture} />
    <p>
      The Rev. Dr. Grady Andrew Yeargin, Jr. was born on November 7, 1949 in
      Greenville, South Carolina. He attended Sterling High School and was
      admitted to Morehouse College in 1966 on an early admission scholarship.
      In 1970, he graduated from Morehouse with a B.A. Degree in Philosophy and
      Religion, he graduated from Colgate-Rochester Divinity School with a
      Master of Divinity Degree in 1973, and he graduated from Wesley
      Theological Seminary in 2005 with a Doctor of Ministry Degree.
    </p>
    <p>
      Dr. Yeargin began his ministerial career in 1973 as the Associate Minister
      of the Mount Zion Baptist Church in Newark, NJ under the pastorate of the
      Rev. Dr. Granville A. Seward. Along with his responsibilities in the areas
      of Youth Ministry, Christian Education and Neighborhood Ministry, Dr.
      Yeargin was also responsible for assuming the pastoral responsibilities in
      the absence of the Pastor.
    </p>
    <p>
      During his tenure at Mount Zion, Dr. Yeargin served as a board member of
      the Campus Christian Foundation, the Youth Council of the American Baptist
      Churches of New Jersey and of the Metropolitan Ecumenical Ministries
      Committee on Neighborhood and Youth Ministry.
    </p>
    <p>
      In 1976, Dr. Yeargin was called to pastor the Mount Prospect Church in
      Rock Hill, South Carolina. Along with providing a new dimension in the
      area of teaching ministry in the church and in the local Bible College,
      Dr. Yeargin held positions in both the local and state conventions along
      with serving on several civic committees.
    </p>
    <p>
      After serving Mount Prospect for nine years, Dr. Yeargin was called to
      pastor the City Temple of Baltimore (Baptist) on September 10, 1985. He
      began his pastorate in January 1986. Dr. Yeargin has brought a new
      dimension of spiritual nourishment and growth to City Temple through
      worship, study, and action. Under his direction several new ministries
      have been established in City Temple that include: the Shelter Ministry,
      the Dance Ministry, the New Members Counselors Ministry, the Christian
      Education Ministry, the Courtesy Guild, the Tape Ministry as well as the
      re-establishment of the Cultural and Fine Arts Ministry and the Building
      Ministry.
    </p>
    <p>
      Dr. Yeargin has been socially involved in the life of the community
      through his participation in Baltimoreans United in Leadership Development
      (B.U.I.L.D.) as well as serving for two years as a clergy co-chairperson,
      the Interdenominational Ministerial Alliance, the Institute for Christian
      and Jewish Studies, The United Missionary Baptist Convention of Maryland,
      and was the previous co-chairperson of the Baltimore affiliate of the
      National Black Leadership Commission on AIDS.
    </p>
    <p>
      Dr. Yeargin is married to Patricia Ann Yeargin and they share two
      daughters, Adia Joy and Candace. He also continues to maintain his sense
      of fatherhood to his beloved daughter, Kimberly Rei, who is deceased.
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
            Church service will be held at 9 am each Sunday unless otherwise
            noted and communicated.
          </li>
          <li>
            If you have a cold, or cold- or flu-like symptoms, please do not
            attend church service.
          </li>
          <li>
            Church service will not exceed 60 minutes in order to limit
            opportunity for germs to spread.
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
            Please continue to send your tithes and offering to your church! We
            suggest three methods for sending in your offering:
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
              <li>
                Drop off: Leave in the mail slot on Eutaw Place or bring in to
                the church office between 9 am - 1 pm (please, no cash)
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
            update it with the church office.
          </li>
          <li>Lenten services have been cancelled.</li>
          <li>
            All church events scheduled for March and April have been postponed
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
    id: IDS.MEDITATION,
    content: meditation,
    title: 'Meditation from the pastor'
  },
  {id: IDS.INFO, content: preventingSickness, title: 'Preventing sickness'},
  {
    id: IDS.IF_INFECTED,
    content: ifInfectedContent,
    title: 'What to do if infected'
  },
  {
    id: IDS.PROCEDURE_CHANGES,
    content: procedureChangesContent,
    title: 'City Temple’s Response to COVID-19'
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
            <h1>Faith in the “Great Physician”</h1>
            <p>
              The enemy uses every opportunity to steal, kill, and destroy—this
              includes our hope, our peace, and our faith. However, God
              instructs us still to “cast all of your cares upon Him, for He
              cares for you” (I Peter 5:7). Faith is a spiritual muscle; and,
              like all muscles, if left dormant, it withers and atrophies.
              Trials and trouble remind us that on our own we are helpless. But
              thanks to God who regards our helpless estate! In all things, we
              already have the victory! Be an inspiration to those who are
              down-hearted and worried. Offer comfort and love to those who
              grieve. Pray and encourage others to pray for those affected by
              the virus. Share facts of the virus to stop the spread of rumors
              and discrimination. Exercise your faith through meditating on
              scripture, prayer, and maintaining a positive outlook.
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
