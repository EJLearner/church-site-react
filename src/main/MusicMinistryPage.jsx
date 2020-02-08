import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

import styled from 'styled-components';
import routePaths from '../routePaths';

const pocContent = `
    POC, ipsum dolor sit amet consectetur adipisicing elit. Tempore
    officia necessitatibus atque molestiae? Eveniet debitis itaque ad iure.
    Cumque reiciendis eveniet quia fugiat eius nostrum vel doloremque
    dignissimos, quisquam atque.
  `;

const culturalContent = `
    Cultural, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const movementContent = `
    Ministry 3, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: 'Perpetual Organ Committee (POC)',
    id: 'poc',
    content: pocContent
  },
  {
    title: 'Cultural and Fine Arts',
    id: 'cultural',
    content: culturalContent
  },
  {
    title: 'Ministry of Movement',
    id: 'movement',
    content: movementContent
  }
];

const StyledUpcomingEvents = styled.div`
  font-size: 150%;
  font-weight: bold;
  text-transform: uppercase;
`;

const upcomingEvents = (
  <>
    <StyledUpcomingEvents>Upcoming Events</StyledUpcomingEvents>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum voluptates
    doloremque sed numquam excepturi fugiat, ducimus quisquam, repellat eos
    doloribus officiis incidunt asperiores itaque sequi quam consequuntur animi
    neque rem.
  </>
);

const topBoxContent = (
  <div>
    <div>
      <h1>Music Ministry</h1>
    </div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
      magni numquam consequatur vitae sapiente unde mollitia a. Tenetur aut nam
      reiciendis repellat excepturi itaque voluptatum assumenda consequuntur!
      Minima, nam tenetur!
    </p>
  </div>
);

const MusicMinistryPage = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Music Ministry"
      pagePath={routePaths.MAIN_MUSIC_MINISTRY}
      topBoxContent={topBoxContent}
      topRightContent={upcomingEvents}
    />
  );
};

export default MusicMinistryPage;
