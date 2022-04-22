import React, {Component} from 'react';

import Slider from '../../../common/Slider';
import slidePictureData from '../../utils/slidePictureData';
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
