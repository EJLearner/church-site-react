import React, {Component} from 'react';
import powerPointImage from './powerpointpicture.png';
import powerPointFile from './RetreatPowerPoint.ppsx';

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
