import React, {useState} from 'react';
import styled from 'styled-components';

import coronaVirusImage from '../assets/main/images/coronavirus.png';
import routePaths from '../routePaths';
import {
  LOGICAL_COLORS,
  SIZES,
  FONT_FAMILIES,
  COLORS
} from '../utils/styleVariables';

import GedPageContactForm from './GetPageContactForm';
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
  }

  .subtitle {
    font-style: italic;
  }

  .info-block {
    line-height: 180%;
  }

  .info-title {
    font-weight: bold;
  }

  hr {
    border-top: 0px solid white;
    color: ${COLORS.GRAY180};
  }

  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-weight: bold;
  }

  .ged-contact-us {
    background-color: grey;
    color: white;
    font-weight: bold;
    padding: 1em;
    position: sticky;
    top: 1em;
    bottom: ${SIZES.FOOTER_HEIGHT};
    text-align: center;
    width: 175px;

    .free {
      text-transform: uppercase;
      color: ${LOGICAL_COLORS.CT_PRIMARY};
    }
  }
`;
const IDS = {
  ABOUT: 'about',
  UPCOMING_CLASSES: 'upcoming-classes'
};

const image = (
  <img
    alt="Coronavirus"
    className="corona-virus-image"
    src={coronaVirusImage}
  />
);

function getUpcomingClassesContent() {
  return (
    <>
      <h2>Free GED Preparation Classes</h2>
      <span className="subtitle">
        Sponsored by W.W. Payne Outreach Center in Partnership with Baltimore
        City Community College
      </span>
      <p className="info-block">
        <span className="info-title">
          Registration &amp; Testing for Winter 2020 GED Preparation Classes
        </span>
        <br />
        Wednesday, December 18, 2019
        <br />
        9 am - 12 pm City Temple of Baltimore (Baptist)
        <br />
        Rev. Dr. Grady A. Yeargin, Jr., Pastor W.W. Payne Outreach Center
        <br />
        317 Dolphin Street
        <br />
        Baltimore, MD 21217
      </p>
      <p className="info-block">
        <span className="info-title">GED Preparation Class Schedule</span>
        <br />
        January 13 - February 28, 2020
        <br />
        Every Monday, Wednesday, and Friday
        <br />9 am - 12 pm
      </p>
      <hr />
      <h3>Contact Us for Registration or More Info</h3>

      <GedPageContactForm />
    </>
  );
}

const aboutContent = (
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

const allContentData = [
  {
    getContent: getUpcomingClassesContent,
    id: IDS.UPCOMING_CLASSES,
    title: 'Upcoming Classes & Registration'
  },
  {
    getContent: () => aboutContent,
    id: IDS.ABOUT,
    title: 'About the GED Prep Program'
  }
];

export default function GedPage() {
  const [contentId, setContentId] = useState(allContentData[0].id);
  const [formInfo, setFormInfo] = useState({email: '', message: '', name: ''});

  const {getContent} = allContentData.find(({id}) => id === contentId);

  const content = getContent(formInfo, setFormInfo);

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
              pagePath={routePaths.MAIN_GED}
              pageTitle="Ged Program"
            />
            <ContentAndSides>
              <ContentLeftSide>
                <SideMenu
                  currentId={contentId}
                  menuData={allContentData}
                  onClick={id => setContentId(id)}
                  title="Ged Program"
                />
              </ContentLeftSide>
              <ContentWrapper>{content}</ContentWrapper>
              <ContentRightSide>
                <div className="ged-contact-us">
                  Contact us for more information about how you can sign up for{' '}
                  <span className="free">free</span> GED Preparation Classes
                </div>
              </ContentRightSide>
            </ContentAndSides>
          </ContentAndSubCompassWrapper>
        </TopInfoBoxWrapper>
      </StandardPageWrapper>
    </StyleWrapper>
  );
}
