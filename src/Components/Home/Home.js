import React, {Component} from 'react';

import slidePictureData from '../../utils/slidePictureData';

import Slider from '../Slider/Slider';
import HomeSquares from '../HomeSquares/HomeSquares';

class Home extends Component {
  render() {
    return (
      <div>
        <Slider
          pictures={slidePictureData.getPictures()}
          showPictureSelectButtons={false}
        />
        <HomeSquares />
      </div>
    );
  }
}

export default Home;
