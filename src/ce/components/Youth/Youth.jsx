import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import CePageLayout from '../Reusable/CePageLayout';

import BibleStudy from './BibleStudy';
import ChildrensChurch from './ChildrensChurch';
import GodsGifts from './GodsGifts';
import SundaySchool from './SundaySchool';
import Ushers from './Ushers';
import VacationBibleSchool from './VacationBibleSchool';

import '../../cePageStyles.scss';

class Youth extends Component {
  getLinkData() {
    return [
      {
        isDefault: true,
        pathKey: 'CE_YOUTH_BIBLE_STUDY',
        render: <BibleStudy />,
        text: 'Bible Study'
      },
      {
        pathKey: 'CE_YOUTH_CHILDRENS_CHURCH',
        render: <ChildrensChurch />,
        text: 'Children’s Church'
      },
      {
        pathKey: 'CE_YOUTH_GODS_GIFTS',
        render: <GodsGifts />,
        text: 'God’s Gifts'
      },
      {
        pathKey: 'CE_YOUTH_SUNDAY_SCHOOL',
        render: <SundaySchool />,
        text: 'Sunday School'
      },
      {
        pathKey: 'CE_YOUTH_VACATION_BIBLE_SCHOOL',
        render: <VacationBibleSchool />,
        text: 'Vacation Bible School'
      },
      {
        pathKey: 'CE_YOUTH_USHERS',
        render: <Ushers />,
        text: 'Youth and Junior Usher Ministry'
      }
    ];
  }

  render() {
    return (
      <CePageLayout
        headerBeginning="CE"
        headerEmph="Programs"
        linkData={this.getLinkData()}
      />
    );
  }
}

export default withRouter(Youth);
