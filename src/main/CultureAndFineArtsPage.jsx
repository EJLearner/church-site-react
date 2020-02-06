import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';
import styled from 'styled-components';
import {LOGICAL_COLORS} from '../utils/styleVariables';

const ApplyNowBox = styled.div`
  color: ${LOGICAL_COLORS.CT_PRIMARY};
  background-color: ${LOGICAL_COLORS.CT_MAIN_YELLOW};
  margin-bottom: 1em;
  font-style: italic;
  padding: 1em;

  h3 {
    color:${LOGICAL_COLORS.CT_PRIMARY}
    margin-top: 0;
    text-transform: uppercase;
  }
`;

const topBoxContent = (
  <div>
    <h1>Culture &amp; Fine Arts</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ullam
      repellat iusto? Officiis mollitia quos quae dolorem, assumenda placeat
      excepturi quibusdam sed explicabo, neque voluptatem sunt, ratione ex eius
      aperiam?
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
    <div>
      <h1>Perpetual Organ Committee</h1>
    </div>
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

const sideContent = [
  <ApplyNowBox key="1">
    <h3>Apply Now</h3>Submit your information today for the 4<sup>th</sup>{' '}
    Sunday Performing Arts Service.
  </ApplyNowBox>
];

const bottomContentData = [
  {
    title: 'Performing Arts Sunday',
    id: 'performingArtsSunday',
    content: performingArtsContent
  },
  {
    title: 'Perpetual Organ Committee (POC)',
    id: 'poc',
    content: pocContent
  }
];

const CultureAndFineArtsPage = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Culture &amp; Fine Arts"
      sideContent={sideContent}
      topBoxContent={topBoxContent}
    />
  );
};

export default CultureAndFineArtsPage;
