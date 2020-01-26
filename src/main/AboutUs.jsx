import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const pastorContent = `
    Pastor, ipsum dolor sit amet consectetur adipisicing elit. Tempore
    officia necessitatibus atque molestiae? Eveniet debitis itaque ad iure.
    Cumque reiciendis eveniet quia fugiat eius nostrum vel doloremque
    dignissimos, quisquam atque.
  `;

const membershipContent = `
    Membership, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const historyContent = `
    History, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: 'The Pastor',
    id: 'thePastor',
    content: pastorContent
  },
  {title: 'Membership', id: 'membership', content: membershipContent},
  {title: 'History', id: 'history', content: historyContent}
];

const topBoxContent = (
  <div>
    <div>
      <h1>Something About Us</h1>
    </div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
      magni numquam consequatur vitae sapiente unde mollitia a. Tenetur aut nam
      reiciendis repellat excepturi itaque voluptatum assumenda consequuntur!
      Minima, nam tenetur!
    </p>
  </div>
);

const MainAboutUs = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="About Us"
      topBoxContent={topBoxContent}
    />
  );
};

export default MainAboutUs;
