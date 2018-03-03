import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import routePaths from '../../../routePaths';

import CePageLayoutA from '../Reusable/CePageLayoutA';

import Ushers from './Ushers';
import GodsGifts from './GodsGifts';
import SundaySchool from './SundaySchool';
import ChildrensChurch from './ChildrensChurch';
import VacationBibleSchool from './VacationBibleSchool';

import '../../cePageStyles.scss';

class Youth extends Component {
  generateLinkData() {
    return [
      {
        isDefault: true,
        path: routePaths.CE_YOUTH_USHERS,
        render: <Ushers />,
        text: 'Youth and Junior Usher Ministry'
      },
      {
        path: routePaths.CE_YOUTH_GODS_GIFTS,
        render: <GodsGifts />,
        text: 'God’s Gifts'
      },
      {
        path: routePaths.CE_YOUTH_SUNDAY_SCHOOL,
        render: <SundaySchool />,
        text: 'Sunday School'
      },
      {
        path: routePaths.CE_YOUTH_CHILDRENS_CHURCH,
        render: <ChildrensChurch />,
        text: 'Children’s Church'
      },
      {
        path: routePaths.CE_YOUTH_VACATION_BIBLE_SCHOOL,
        render: <VacationBibleSchool />,
        text: 'Vacation Bible School'
      }
    ];
  }

  render() {
    const linkData = this.generateLinkData();

    return (
      <CePageLayoutA
        headerBeginning="Youth"
        headerEmph="Ministries"
        linkData={linkData}
      />
    );
  }
}

Youth.propTypes = {
  location: PropTypes.object
};

export default withRouter(Youth);
