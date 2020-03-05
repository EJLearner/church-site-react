import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {LOGICAL_COLORS, WIDTHS, SIZES} from '../../utils/styleVariables';
import routePaths from '../../routePaths';

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
  }
  // TODO: add later
  // {
  //   actionWord: 'Follow Us',
  //   path: routePaths.MAIN_CONTACT,
  //   subject: 'Social Media'
  // }
];

const Styledfooter = styled.footer`
  position: fixed;
  // TODO: Add box shadow to page footer, mimic drexel
  // box-shadow: 0 -4px 5px #c2c2c2;
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
