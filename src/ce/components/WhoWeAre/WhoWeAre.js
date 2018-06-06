import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import CePageLayoutA from '../Reusable/CePageLayoutA';

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
      // {
      //   path: routePaths.CE_WHO_DIACONATE,
      //   render: <Diaconate />,
      //   text: 'Diaconate'
      // },
      // {path: routePaths.CE_WHO_TRUSTEES, render: <Trustees />, text: 'Trustees'}

      // This content won't be ready for a while. Left the code to remember that sublevels are possible
      // {
      //   path: routePaths.CE_WHO_HANDBOOK,
      //   render: <Handbook />,
      //   text: 'Leadership Handbook',
      //   children: [
      //     {path: routePaths.CE_WHO_FINANCE, render: <Finance />, text: 'Finance'},
      //     {path: routePaths.CE_WHO_MEETINGS`, render: <Meetings />, text: 'Church Meetings'}
      //   ]
      // }
    ];
  }

  render() {
    const linkData = this.generateLinkData();
    return (
      <CePageLayoutA
        headerBeginning="Who We"
        headerEmph="Are"
        linkData={linkData}
      />
    );
  }
}

WhoWeAre.propTypes = {
  location: PropTypes.object
};

export default withRouter(WhoWeAre);
