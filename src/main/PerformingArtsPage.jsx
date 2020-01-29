import React from 'react';
import GeneralPageTemplate from './commonComponents/GeneralPageTemplate';

const topBoxContent = (
  <div>
    <div>
      <h1>Performing Arts Sunday</h1>
    </div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
      magni numquam consequatur vitae sapiente unde mollitia a. Tenetur aut nam
      reiciendis repellat excepturi itaque voluptatum assumenda consequuntur!
      Minima, nam tenetur!
    </p>
  </div>
);

const PerformingArtsPage = () => {
  return <GeneralPageTemplate topBoxContent={topBoxContent} />;
};

export default PerformingArtsPage;
