import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import CePageLayout from '../Reusable/CePageLayout';

import routePaths from '../../../routePaths';

import ChristianEdStaff from './ChristianEdStaff';
import Pastor from './Pastor';
import MinisterialStaff from './MinisterialStaff';

import '../../cePageStyles.css';

class WhoWeAre extends Component {
  generateLinkData() {
    return [
      {
        path: routePaths.CE_WHO_PASTOR,
        render: <Pastor />,
        text: 'Pastor Yeargin',
        isDefault: true
      },
      {
        path: routePaths.CE_WHO_CTBC,
        render: <MinisterialStaff />,
        text: 'CTBC Ministerial Staff'
      },
      {
        path: routePaths.CE_WHO_CHRISTIAN_ED_STAFF,
        render: <ChristianEdStaff />,
        text: 'Christian Education'
      }
    ];
  }

  render() {
    const linkData = this.generateLinkData();
    return (
      <CePageLayout
        headerBeginning="Who We"
        headerEmph="Are"
        linkData={linkData}
      />
    );
  }
}

export default withRouter(WhoWeAre);
