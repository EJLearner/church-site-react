import React, {Component} from 'react';

import powerPointFile from './RetreatPowerPoint.ppsx';
import powerPointImage from './powerpointpicture.png';

class PowerPoint extends Component {
  render() {
    return (
      <div>
        <a href={powerPointFile}>
          <img
            alt="Power Point Link"
            src={powerPointImage}
            style={{width: '100%'}}
          />
        </a>
      </div>
    );
  }
}

export default PowerPoint;
