import React, {useState} from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import AnnouncementBox from './AnnouncementBox.jsx';

const MenuAndContent = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  border: 1px solid black;
  padding: 1em;
  width: 30%;

  h2 {
    margin-top: 0;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
  }
`;

const Content = styled.div`
  border: 1px solid black;
  padding: 1em;
  width: 70%;
`;

const ContentButton = styled.button`
  background-color: ${LOGICAL_COLORS.STANDARD_BACKGROUND};
  border: none;
  cursor: pointer;
  display: block;
  line-height: 150%;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const SideMenu = ({onClick, menuData, title}) => {
  return (
    <LeftSide>
      <h2>{title}</h2>
      <ul>
        {menuData.map(({id, title}) => (
          <li key={id} onClick={() => onClick(id)}>
            <ContentButton>{title}</ContentButton>
          </li>
        ))}
      </ul>
    </LeftSide>
  );
};

SideMenu.propTypes = {
  menuData: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired
};

const GeneralPage = ({topBoxContent, bottomContentData, menuTitle}) => {
  const [contentId, setContentId] = useState(bottomContentData[0].id);

  return (
    <div className="menu-bar-and-picture">
      <MainMenubar />
      <AnnouncementBox>{topBoxContent}</AnnouncementBox>
      <MenuAndContent>
        <SideMenu
          menuData={bottomContentData}
          onClick={id => setContentId(id)}
          title={menuTitle}
        />
        <Content>
          {
            bottomContentData.find(menuItem => menuItem.id === contentId)
              .content
          }
        </Content>
      </MenuAndContent>
    </div>
  );
};

GeneralPage.propTypes = {
  bottomContentData: PropTypes.array.isRequired,
  menuTitle: PropTypes.string.isRequired,
  topBoxContent: PropTypes.node.isRequired
};

export default GeneralPage;
