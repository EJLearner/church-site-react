import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import CePageLayoutA from '../Reusable/CePageLayoutA';

import routePaths from '../../../routePaths';

import ChristianEdStaff from './ChristianEdStaff';
import Pastor from './Pastor';
import Diaconate from './Diaconate';
import MinisterialStaff from './MinisterialStaff';
import Trustees from './Trustees';

import '../../cePageStyles.css';

class WhoWeAre extends Component {
  generateLinkData() {
    const {CE_WHO} = routePaths;

    return [
      {
        path: `${CE_WHO}/pastor`,
        render: <Pastor />,
        text: 'Pastor Yeargin',
        isDefault: true
      },
      {
        path: `${CE_WHO}/ctbc`,
        render: <MinisterialStaff />,
        text: 'CTBC Ministerial Staff'
      },
      {
        path: `${CE_WHO}/christian-ed-staff`,
        render: <ChristianEdStaff />,
        text: 'Christian Education'
      },
      {path: `${CE_WHO}/diaconate`, render: <Diaconate />, text: 'Diaconate'},
      {path: `${CE_WHO}/trustees`, render: <Trustees />, text: 'Trustees'}

      // This content won't be ready for a while. Left the code to remember that sublevels are possible
      // {
      //   path: `${CE_WHO}/handbook`,
      //   render: <Handbook />,
      //   text: 'Leadership Handbook',
      //   children: [
      //     {path: `${CE_WHO}/finance`, render: <Finance />, text: 'Finance'},
      //     {path: `${CE_WHO}/meetings`, render: <Meetings />, text: 'Church Meetings'}
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
