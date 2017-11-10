import React, {Component} from 'react';
import Link from 'react-router-dom';

import powerPointImage from './powerpointpicture.png';
import powerPointFile from './RetreatPowerPoint.ppsx';

class Finance extends Component {
  render() {
    console.log(powerPointFile);
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

export default Finance;
