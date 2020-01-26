import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const ministry1Content = `
    Ministry 1, ipsum dolor sit amet consectetur adipisicing elit. Tempore
    officia necessitatibus atque molestiae? Eveniet debitis itaque ad iure.
    Cumque reiciendis eveniet quia fugiat eius nostrum vel doloremque
    dignissimos, quisquam atque.
  `;

const ministry2Content = `
    Ministry 2, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const ministry3Content = `
    Ministry 3, ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
    necessitatibus atque molestiae? Eveniet debitis itaque ad iure. Cumque
    reiciendis eveniet quia fugiat eius nostrum vel doloremque dignissimos,
    quisquam atque.
  `;

const bottomContentData = [
  {
    title: 'Ministry 1',
    id: 'ministry1',
    content: ministry1Content
  },
  {
    title: 'Ministry 2',
    id: 'ministry2',
    content: ministry2Content
  },
  {
    title: 'Ministry 3',
    id: 'ministry3',
    content: ministry3Content
  }
];

const topBoxContent = (
  <div>
    <div>
      <h1>Ministries</h1>
    </div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
      magni numquam consequatur vitae sapiente unde mollitia a. Tenetur aut nam
      reiciendis repellat excepturi itaque voluptatum assumenda consequuntur!
      Minima, nam tenetur!
    </p>
  </div>
);

const MinistriesPage = () => {
  return (
    <GeneralPageTemplate
      bottomContentData={bottomContentData}
      menuTitle="Ministries"
      topBoxContent={topBoxContent}
    />
  );
};

export default MinistriesPage;
