import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
        path: '/youth/ushers',
        render: <Ushers />,
        text: 'Youth & Young Adult Ushers'
      },
      {
        path: '/youth/godsgifts',
        render: <GodsGifts />,
        text: 'God’s Gifts'
      },
      {
        path: '/youth/sundayschool',
        render: <SundaySchool />,
        text: 'Sunday School'
      },
      {
        path: '/youth/childrenschurch',
        render: <ChildrensChurch />,
        text: 'Children’s Church'
      },
      {
        path: '/youth/vacationbibleschool',
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
