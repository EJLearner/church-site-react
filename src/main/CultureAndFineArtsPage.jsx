import React, {useEffect} from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';
import styled from 'styled-components';
import {LOGICAL_COLORS} from '../utils/styleVariables';
import PurchaseHereLink from './commonComponents/PurchaseHereLink';
import aframMuseum from '../assets/main/images/afram-museum.jpg';
import suicideBridgeSign from '../assets/main/images/suicide-bridge-sign.jpg';
import routePaths from '../routePaths';
import backgroundStore from '../stores/backgroundStore';

const ApplyNowBox = styled.div`
  color: ${LOGICAL_COLORS.CT_PRIMARY};
  background-color: ${LOGICAL_COLORS.CT_ACCENT};
  margin-bottom: 1em;
  font-style: italic;
  padding: 1em;

  h3 {
    color:${LOGICAL_COLORS.CT_PRIMARY}
    margin-top: 0;
    text-transform: uppercase;
  }
`;

const SideImage = styled.img`
  height: auto;
  margin-bottom: 1em;
  width: 100%;
`;

const Event = styled.div`
  margin-bottom: 3em;
  width: 80%;

  .description {
    font-weight: bold;
  }

  .details {
    font-style: italic;
    line-height: 150%;
  }
`;

const DC_TOUR_ID = 'dc-tour-2020';
const ORGANSCAPE_ID = 'organscape-2020';
const CRAB_FEAST_ID = 'dc-tour-2020';
const DC_TOUR_TITLE = 'DC Tour 2020';
const ARTSCAPE_TITLE = 'Artscape to Organscape 2020';
const CRAB_FEAST_TITLE = 'Eastern Shore Crab Feast';

const topBoxContent = (
  <div>
    <h1>Culture &amp; Fine Arts</h1>
    <p>
      The Music Ministry oversees several ministries and committees responsible
      for promoting cultural awareness and appreciation of the arts. They
      include the Movement Ministry, the Cultural &amp; Fine Arts Ministry, and
      the Perpetual Organ Committee (POC).
    </p>
  </div>
);

const performingArtsContent = (
  <div>
    <div>
      <h1>Performing Arts Sunday</h1>
    </div>
    <div>
      <p>
        To enhance City Temple’s worship experience and community outreach,
        beginning in 2020, City Temple will introduce Performing Arts Sunday, a
        special and exciting addition to our music ministry. On the 4th Sunday
        of each month, the worship service will consist of artistic talent from
        artistic talent might include solo or ensemble sacred, classical,
        spiritual, or hymnal jazz vocal and instrument; dance; theater; and
        dramatic readings.
      </p>
      <p>
        You can assist the Performing Arts Sunday Team by identifying talented
        artists for our 4th Sunday services. If you have artistic talent or know
        talented artists that you would like to recommend, please the artist’s
        name, telephone number, email address, and the area of talent to
        performingarts@thecitytemple.org. Please attach the artist’s headshot
        and bio to the email. If you do not have all of this information to
        submit, please submit your email and the Performing Arts Team will
        contact the prospective artist to gather additional information. All
        prospective artists will be vetted by the Performing Arts Team.
      </p>
      <p>
        The Performing Arts Team thanks you in advance for helping to make City
        Temple’s 4th Sunday a joyous worship experience!
      </p>
    </div>
  </div>
);

const pocContent = (
  <div>
    <h1>Perpetual Organ Committee</h1>
    <div>
      <p>
        The Perpetual Organ Committee is responsible for promoting an awareness
        of the organ and raising funds to assist the church with the upkeep of
        our organ through the Perpetual Organ Fund. This is accomplished through
        our sponsors and annual fundraising initiatives. Our annual event is
        “Organscape”. This event coincides with the Baltimore Office of
        Promotion and the Arts Annual “Artscape”. Organscape features organists
        and artists from the Mount Royal and Bolton Hill Cultural District, the
        greater Baltimore Area, and beyond performing on the Organ—the Adam
        Stein 144 Rank Pipe Organ, the grand piano, and the Hammond B3 Organ.
      </p>
      <p>
        Donations to the Perpetual Organ Fund are derived from sponsors and
        patrons at our annual event, Organscape and fundraisers, such as trips
        within Maryland and Washington DC to various cultural and historical
        sites, and crab feasts and restored and preserved sites of our enslaved
        ancestry on the Eastern Shore.
      </p>
      <p>
        In 1970 when City Temple was purchased, the organ was unusable, however
        through the vision of Rev. William W. Payne, and Dr. Kenneth Dean, the
        organ was rebuilt, thanks to the late Ernest Horning and Ronald Unger of
        the Shantz Organ Co. Throughout the years this organ has been upgraded
        to the beautiful instrument it is today.{' '}
      </p>
      <p>
        The Perpetual Organ Committee is a sub-committee of the Music Ministry’s
        Cultural and Fine Arts Committee.
      </p>
    </div>
  </div>
);

const upcomingEventsContent = (
  <div>
    <div>
      <Event>
        <h2>{DC_TOUR_TITLE}</h2>
        <p className="description" id={DC_TOUR_ID}>
          Trip to Washington, DC for self-guided tours of the Rosa Parks Exhibit
          at the Library of Congress and a National Museum of African-American
          History and Culture
        </p>
        <p className="details">
          March 23, 2020
          <br />
          All Day
          <br />
          $50 (Adults)
          <br />
          $25 (Children/Youth)
        </p>
        <PurchaseHereLink to="need-page" />
      </Event>
      <Event>
        <h2>{ARTSCAPE_TITLE}</h2>
        <p className="description" id={ORGANSCAPE_ID}>
          Featuring organists and artists from the Mount Royal Bolton Hill
          Cultural District and beyond performing on our historic Adam Stein 144
          Rank Pipe Organ
        </p>
        <p className="details">
          July 18, 2020
          <br />1 pm
          <br />
          Free Admission
        </p>
      </Event>
      <Event>
        <h2>{CRAB_FEAST_TITLE}</h2>
        <p className="description" id={CRAB_FEAST_ID}>
          Trip includes an authentic Eastern Shore all-you-can-eat Crab Feast at
          the Suicide Bridge Restaurant and guided tour of Highland Beach, which
          was founded by Frederick Douglass’s son Charles Douglass and his wife
          Laura; Produce Stand Stop.
        </p>
        <p className="details">
          August 15, 2020
          <br />
          All Day
          <br />
          $100
        </p>
        <PurchaseHereLink to="need-page" />
      </Event>
    </div>
  </div>
);

const performingArtsSideContent = [
  <ApplyNowBox key="1">
    <h3>Apply Now</h3>
    Submit your information today for the 4<sup>th</sup> Sunday Performing Arts
    Service.
  </ApplyNowBox>
];

const upComingEventsSideContent = [
  <SideImage
    alt="African American History Museum"
    key="museum"
    src={aframMuseum}
  ></SideImage>,
  <SideImage
    alt="Suicide Bridge Restaurant Sign"
    key="restaurant"
    src={suicideBridgeSign}
  ></SideImage>
];

const bottomContentData = [
  {
    title: 'Performing Arts Sunday',
    id: 'performingArtsSunday',
    content: performingArtsContent,
    sideContent: performingArtsSideContent
  },
  {
    title: 'Perpetual Organ Committee (POC)',
    id: 'poc',
    content: pocContent
  },
  {
    title: 'Upcoming Events',
    id: 'upcomingEvents',
    content: upcomingEventsContent,
    sideContent: upComingEventsSideContent,
    subLinks: [
      {title: DC_TOUR_TITLE, elementId: DC_TOUR_ID},
      {title: ARTSCAPE_TITLE, elementId: ORGANSCAPE_ID},
      {title: CRAB_FEAST_TITLE, elementId: CRAB_FEAST_ID}
    ]
  }
];

const CultureAndFineArtsPage = () => {
  useEffect(() => {
    backgroundStore.setBackgroundSource(
      backgroundStore.backgroundSources.DANCE
    );

    return () => backgroundStore.resetBackground();
  }, []);

  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Culture &amp; Fine Arts"
      pagePath={routePaths.MAIN_CULTURE_AND_ARTS}
      sectionSideContent={performingArtsSideContent}
      topBoxContent={topBoxContent}
    />
  );
};

export default CultureAndFineArtsPage;
