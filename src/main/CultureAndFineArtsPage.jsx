import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const topBoxContent = (
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

const CultureAndFineArtsPage = () => {
  return <GeneralPageTemplate topBoxContent={topBoxContent} />;
};

export default CultureAndFineArtsPage;
