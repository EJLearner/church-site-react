import React, {useState} from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {WIDTHS} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import AnnouncementBox from './AnnouncementBox.jsx';
import PlainButton from './PlainButton';

const StyledAnnouncementBoxWrapper = styled.div`
  justify-content: space-between;
  margin: ${WIDTHS.SIDE_CONTENT_PADDING};

  display: flex;

  .announcement-box {
    min-width: 50%;
  }

  .more-content {
    margin-left: 1em;
  }
`;

const MenuAndContent = styled.div`
  display: flex;
  padding: 0 ${WIDTHS.SIDE_CONTENT_PADDING}
  flex-direction: row;
`;

const LeftSide = styled.div`
  border: 1px solid gray;
  padding: 1em;

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
  border: 1px solid gray;
  padding: 1em;
  width: 70%;
`;

const ContentButton = styled(PlainButton)`
  display: block;
  line-height: 150%;
`;

const MenuTitle = styled.h2`
  font-size: 110%;
  text-transform: uppercase;
`;

const SideMenu = ({onClick, menuData, title}) => {
  return (
    <LeftSide>
      <MenuTitle>{title}</MenuTitle>
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

const GeneralPage = ({
  topBoxContent,
  bottomContentData,
  menuTitle,
  topRightContent
}) => {
  const [contentId, setContentId] = useState(bottomContentData[0].id);

  return (
    <div className="menu-bar-and-picture">
      <MainMenubar />
      <StyledAnnouncementBoxWrapper>
        <AnnouncementBox className="announcement-box">
          {topBoxContent}
        </AnnouncementBox>
        {topRightContent && (
          <div className="more-content">{topRightContent}</div>
        )}
      </StyledAnnouncementBoxWrapper>
      <MenuAndContent>
        <SideMenu
          menuData={bottomContentData}
          onClick={id => setContentId(id)}
          title={menuTitle}
        />
        <Content>
          {bottomContentData.find(({id}) => id === contentId).content}
        </Content>
      </MenuAndContent>
    </div>
  );
};

GeneralPage.propTypes = {
  bottomContentData: PropTypes.array.isRequired,
  menuTitle: PropTypes.string.isRequired,
  topBoxContent: PropTypes.node.isRequired,
  topRightContent: PropTypes.node
};

export default GeneralPage;
