import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import routePaths from '../../routePaths';
import {bibleComFormattedVerses} from '../../stores/dailyVerses';
import weeklyMeditations from '../../stores/weeklyMeditations';
import constants from '../../utils/constants';
import {getStartOfWeek} from '../../utils/dateTimeUtils';
import {LOGICAL_COLORS, WIDTHS, SIZES} from '../../utils/styleVariables';

const SCRIPTURES_ID = 'scriptures';

const footerData = [
  // TODO: add later
  // {
  //   actionWord: 'Apply',
  //   path: routePaths.MAIN_SCHOLARSHIP,
  //   subject: 'Dr. William Bryant Scholarship'
  // },
  {
    actionWord: 'Visit',
    path: routePaths.MAIN_CONTACT,
    subject: 'Service Info'
  },
  {
    actionWord: 'Connect',
    path: routePaths.MAIN_MINISTRIES,
    subject: 'Ministries'
  },
  {
    actionWord: 'Giving',
    path: routePaths.MAIN_GIVING,
    subject: 'Make A Gift'
  },
  {
    actionWord: 'Scriptures',
    id: SCRIPTURES_ID,
    path: routePaths.MAIN_MEDITATIONS,
    subject: 'Meditations'
  }
  // TODO: add later
  // {
  //   actionWord: 'Follow Us',
  //   path: routePaths.MAIN_CONTACT,
  //   subject: 'Social Media'
  // }
];

const showScriptures = () => {
  const firstDateOfWeek = getStartOfWeek(
    constants.DATE_FNS_INTERNAL_DATE_FORMAT
  );

  return Boolean(
    weeklyMeditations[firstDateOfWeek] &&
      bibleComFormattedVerses[firstDateOfWeek]
  );
};

const Styledfooter = styled.footer`
  position: fixed;
  box-shadow: 0px -1px 10px black;
  background-color: ${LOGICAL_COLORS.CT_ACCENT};
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${SIZES.FOOTER_HEIGHT};
  width: 100%;
`;

const NavStyleWrapper = styled.nav`
  display: flex;
  padding-left: ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const FooterItem = styled.div`
  color: ${LOGICAL_COLORS.CT_PRIMARY};
  font-size: 80%;
  margin-right: 48px;

  & div:first-child {
    font-weight: bold;
    text-transform: uppercase;
  }

  & a {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

const MainFooter = () => {
  let displayedFooterData = footerData;

  if (!showScriptures()) {
    displayedFooterData = footerData.filter(({id}) => id !== SCRIPTURES_ID);
  }

  return (
    <Styledfooter>
      <NavStyleWrapper>
        {displayedFooterData.map(({path, actionWord, subject}) => (
          <FooterItem key={actionWord}>
            <Link to={path}>
              <div>{actionWord}</div>
              <div>{subject}</div>
            </Link>
          </FooterItem>
        ))}
      </NavStyleWrapper>
    </Styledfooter>
  );
};

export default MainFooter;
