import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {LOGICAL_COLORS, WIDTHS} from '../../utils/styleVariables';
import routePaths from '../../routePaths';

const footerData = [
  {
    actionWord: 'Apply',
    path: routePaths.MAIN_SCHOLARSHIP,
    subject: 'Dr. William Bryant Scholarship'
  },
  {
    actionWord: 'Visit',
    path: routePaths.MAIN_SERVICE_INFO,
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
    actionWord: 'Follow Us',
    path: routePaths.MAIN_CONTACT,
    subject: 'Social Media'
  }
];

const Styledfooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NavStyleWrapper = styled.nav`
  background-color: ${LOGICAL_COLORS.CT_MAIN_YELLOW};
  display: flex;
  padding: 24px ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const FooterItem = styled.div`
  color: ${LOGICAL_COLORS.CT_PRIMARY};
  font-size: 80%;
  margin-right: 48px;

  & div:first-child {
    font-weight: bold;
  }

  & a {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }
`;

const MainFooter = () => {
  return (
    <Styledfooter>
      <NavStyleWrapper>
        {footerData.map(({path, actionWord, subject}) => (
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
