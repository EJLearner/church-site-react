import React from 'react';
import GeneralPage from './commonComponents/GeneralPage';

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
    <GeneralPage
      bottomContentData={bottomContentData}
      menuTitle="Music Ministry"
      topBoxContent={topBoxContent}
      topRightContent="Upcoming Events"
    />
  );
};

export default MusicMinistryPage;
