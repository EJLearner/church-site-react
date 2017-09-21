import React from 'react';

import Slider from '../Slider/Slider';
import HomeSquares from '../HomeSquares/HomeSquares';

const Home = () => {
  return (
    <div>
      <Slider showPictureSelectButtons={false} />
      <HomeSquares />
    </div>
  );
};

export default Home;
