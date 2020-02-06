import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const topBoxContent = (
  <div>
    <h1>Worship Experience</h1>
    <p>
      Here at The City Temple of Baltimore (Baptist), we follow an Order of
      Worship. While our intent is to remain consistent with this Order of
      Worship, the experience can change in the blink of any eye based on a
      testimony, a musical selection, a prayer, or whatever moves the spirit
      within us. In general, we anticipate a musical prelude, offering, sermon,
      invitation to Christian Discipleship, and musical postlude at each worship
      service. All are welcome.
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
        To perform City Temple’s worship experience and community outreach,
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
    <div></div>
  </div>
);

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

const WorshipExperiencePage = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Culture &amp; Fine Arts"
      topBoxContent={topBoxContent}
    />
  );
};

export default WorshipExperiencePage;
