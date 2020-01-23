import React from 'react';

import GeneralPage from '../commonComponents/GeneralPage';

const contentIds = {
  ANNIVERSARY: '50thAnniversary',
  CALENDAR: 'calendar',
  STORE: 'store'
};

const sampleContent = (
  <>
    Anniversary, ipsum dolor sit amet consectetur adipisicing elit. Tempore
    officia necessitatibus atque molestiae? Eveniet debitis itaque ad iure.
    Cumque reiciendis eveniet quia fugiat eius nostrum vel doloremque
    dignissimos, quisquam atque.
  </>
);

const calendarContent = (
  <>
    Calendar, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  </>
);

const storeContent = (
  <>
    Store, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  </>
);

const bottomContentData = [
  {
    title: '50th Anniversary Celebration',
    id: contentIds.ANNIVERSARY,
    content: sampleContent
  },
  {title: 'Event Calendar', id: contentIds.CALENDAR, content: calendarContent},
  {title: 'Store', id: contentIds.STORE, content: storeContent}
];

const topBoxContent = (
  <div>
    <div>
      <h1>Performing Arts</h1>
      <h2>Year of Jubilee!</h2>
    </div>
    <p>
      2020 marks an important milestone in the life of our church. Join us each
      Sunday as we celebrate and thank God for 50 years of worship, outreach,
      and praise!
    </p>
  </div>
);

function JubileePage() {
  return (
    <GeneralPage
      bottomContentData={bottomContentData}
      menuTitle="Anniversary"
      topBoxContent={topBoxContent}
    />
  );
}

export default JubileePage;
