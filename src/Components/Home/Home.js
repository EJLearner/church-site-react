import React from 'react';

import slidePictureData from '../../utils/slidePictureData';

import Slider from '../Slider/Slider';
import HomeSquares from '../HomeSquares/HomeSquares';

const Home = () => {
  const slidePictures = slidePictureData.getPictures();

  return (
    <div>
      <Slider pictures={slidePictures} showPictureSelectButtons={false} />
      <HomeSquares />
    </div>
  );
};

export default Home;
