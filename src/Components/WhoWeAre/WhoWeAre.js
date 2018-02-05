import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import CePageLayoutA from '../Reusable/CePageLayoutA';

import ChristianEdStaff from './ChristianEdStaff';
import Pastor from './Pastor';
import Diaconate from './Diaconate';
import MinisterialStaff from './MinisterialStaff';
import Trustees from './Trustees';

import '../../cePageStyles.css';

class WhoWeAre extends Component {
  generateLinkData() {
    return [
      {
        path: '/who/pastor',
        render: <Pastor />,
        text: 'Pastor Yeargin',
        isDefault: true
      },
      {
        path: '/who/ctbc',
        render: <MinisterialStaff />,
        text: 'CTBC Ministerial Staff'
      },
      {
        path: '/who/christian-ed-staff',
        render: <ChristianEdStaff />,
        text: 'Christian Education'
      },
      {path: '/who/diaconate', render: <Diaconate />, text: 'Diaconate'},
      {path: '/who/trustees', render: <Trustees />, text: 'Trustees'}

      // This content won't be ready for a while. Left the code to remember that sublevels are possible
      // {
      //   path: '/who/handbook',
      //   render: <Handbook />,
      //   text: 'Leadership Handbook',
      //   children: [
      //     {path: '/who/finance', render: <Finance />, text: 'Finance'},
      //     {path: '/who/meetings', render: <Meetings />, text: 'Church Meetings'}
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
