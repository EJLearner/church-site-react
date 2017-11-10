import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeftLinks from '../Reusable/LeftLinks/LeftLinks';
import SubPageSwitch from '../Reusable/SubPageSwitch/SubPageSwitch';

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
        altPath: '/who',
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
      <div id="ce-page-left-content">
        <h1>
          Who We <span className="emphwelcomeline">Are</span>
        </h1>
        <LeftLinks
          linkData={linkData}
          pathname={this.props.location.pathname}
        />
        <div className="ce-page-right-content">
          <SubPageSwitch linkData={linkData} />
        </div>
      </div>
    );
  }
}

WhoWeAre.propTypes = {
  location: PropTypes.object
};

export default withRouter(WhoWeAre);
