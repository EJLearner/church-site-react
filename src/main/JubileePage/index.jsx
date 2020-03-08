import React, {useEffect} from 'react';

import GeneralPageTemplate from '../commonComponents/GeneralPageTemplate';
import routePaths from '../../routePaths';
import backgroundStore from '../../stores/backgroundStore';

const anniversaryContent = (
  <div>
    Leviticus 25:9
    <p>
      Then on the Day of Atonement in the fiftieth year, blow the ram’s horn
      loud and long throughout the land.
    </p>
    <p>
      Greetings, church family, friends, Christian brothers and sisters.
      Hallelujah and To God Be the Glory! We are poised to celebrate 50
      triumphant years in history at The City Temple of Baltimore (Baptist). The
      Lord has blessed us to reach this milestone in the life of our church and
      we honor and thank him for his Grace, Mercy, Faith, and guidance that
      brought us this far. Throughout this year of Jubilee, we will recognize,
      honor, and celebrate the historic events in our past and formulate our
      vision for our future.
    </p>
    <p>
      This is an exciting time in the life of our church, a time for reflection
      and forward thinking. We are both grateful for the past and accepting of
      the challenge for the future. Please join us as we journey forward and
      rejoice in what God has done!
    </p>
    <p>Avis Anderson Chair, 50th Anniversary</p>
  </div>
);

// eslint-disable-next-line no-unused-vars
const calendarContent = `
    Calendar, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

// eslint-disable-next-line no-unused-vars
const storeContent = `
    Store, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: '50th Anniversary Celebration',
    id: '50thAnniversary',
    content: anniversaryContent
  }
  // TODO: add these back
  // {title: 'Event Calendar', id: 'calendar', content: calendarContent},
  // {title: 'Store', id: 'store', content: storeContent}
];

const topBoxContent = (
  <div>
    <div>
      <h1>JUBILEE ANNIVERSARY</h1>
    </div>
    <p>
      2020 marks an important milestone in the life of our church. Join us each
      Sunday as we celebrate and thank God for 50 years of worship, outreach,
      and praise!
    </p>
  </div>
);

function JubileePage() {
  useEffect(() => {
    backgroundStore.setBackgroundSource(
      backgroundStore.backgroundSources.SHOFARBLOWERS
    );

    return () => backgroundStore.resetBackground();
  }, []);

  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Anniversary"
      pagePath={routePaths.MAIN_JUBILEE}
      topBoxContent={topBoxContent}
    />
  );
}

export default JubileePage;
