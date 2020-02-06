import React, {useState} from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {WIDTHS, COLORS} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import TopInfoBox from './TopInfoBox';
import PlainButton from './PlainButton';

const StyledTopInfoBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${WIDTHS.SIDE_CONTENT_PADDING};

  .announcement-box {
    min-width: 50%;
  }

  .more-content {
    margin-left: 1em;
  }
`;

const ContentAndSide = styled.div`
  display: flex;
  padding: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
`;

const MenuAndContent = styled.div`
  display: flex;
  margin-right: 4em;
`;

const LeftSide = styled.div`
  background-color: ${COLORS.WHITE};
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
  background-color: ${COLORS.WHITE};
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

const SideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
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
  title: PropTypes.string.isRequired
};

const GeneralPageTemplate = props => {
  const {
    topBoxContent,
    bottomContentData,
    menuTitle,
    sideContent,
    topRightContent
  } = props;

  const [contentId, setContentId] = useState(bottomContentData?.[0].id);

  return (
    <div>
      <MainMenubar />
      <StyledTopInfoBoxWrapper>
        <TopInfoBox className="announcement-box">{topBoxContent}</TopInfoBox>
        {topRightContent && (
          <div className="more-content">{topRightContent}</div>
        )}
      </StyledTopInfoBoxWrapper>
      <ContentAndSide>
        {Boolean(menuTitle && bottomContentData) && (
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
        )}
        {sideContent ? (
          <SideContentWrapper>{sideContent}</SideContentWrapper>
        ) : null}
      </ContentAndSide>
    </div>
  );
};

GeneralPageTemplate.propTypes = {
  bottomContentData: PropTypes.array,
  menuTitle: PropTypes.string,
  sideContent: PropTypes.node,
  topBoxContent: PropTypes.node.isRequired,
  topRightContent: PropTypes.node
};

export default GeneralPageTemplate;
