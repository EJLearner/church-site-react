import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import routePaths from '../../../routePaths';

import CePageLayout from '../Reusable/CePageLayout';

import BibleStudy from './BibleStudy';
import ChildrensChurch from './ChildrensChurch';
import GodsGifts from './GodsGifts';
import SundaySchool from './SundaySchool';
import Ushers from './Ushers';
import VacationBibleSchool from './VacationBibleSchool';

import '../../cePageStyles.scss';

class Youth extends Component {
  generateLinkData() {
    return [
      {
        isDefault: true,
        path: routePaths.CE_YOUTH_BIBLE_STUDY,
        render: <BibleStudy />,
        text: 'Bible Study'
      },
      {
        path: routePaths.CE_YOUTH_CHILDRENS_CHURCH,
        render: <ChildrensChurch />,
        text: 'Children’s Church'
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
        path: routePaths.CE_YOUTH_VACATION_BIBLE_SCHOOL,
        render: <VacationBibleSchool />,
        text: 'Vacation Bible School'
      },
      {
        path: routePaths.CE_YOUTH_USHERS,
        render: <Ushers />,
        text: 'Youth and Junior Usher Ministry'
      }
    ];
  }

  render() {
    const linkData = this.generateLinkData();

    return (
      <CePageLayout
        headerBeginning="CE"
        headerEmph="Programs"
        linkData={linkData}
      />
    );
  }
}

export default withRouter(Youth);
