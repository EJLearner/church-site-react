import React, {useState} from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {WIDTHS, COLORS} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import TopInfoBox from './TopInfoBox';
import SideMenu from './SideMenu';

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

const Content = styled.div`
  background-color: ${COLORS.WHITE};
  border: 1px solid gray;
  padding: 1em;
  width: 70%;
`;

const SideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
`;

const GeneralPageTemplate = props => {
  const {
    topBoxContent,
    bottomContentData,
    menuTitle,
    pageWideSideContent,
    topRightContent
  } = props;

  const [contentId, setContentId] = useState(bottomContentData?.[0].id);

  const {sideContent: sectionSideContent, content} = bottomContentData.find(
    ({id}) => id === contentId
  );

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
              currentId={contentId}
              menuData={bottomContentData}
              onClick={id => setContentId(id)}
              title={menuTitle}
            />
            <Content>{content}</Content>
          </MenuAndContent>
        )}
        {pageWideSideContent || sectionSideContent ? (
          <SideContentWrapper>
            {pageWideSideContent}
            {sectionSideContent}
          </SideContentWrapper>
        ) : null}
      </ContentAndSide>
    </div>
  );
};

GeneralPageTemplate.propTypes = {
  bottomContentData: PropTypes.array,
  menuTitle: PropTypes.string,
  pageWideSideContent: PropTypes.node,
  topBoxContent: PropTypes.node.isRequired,
  topRightContent: PropTypes.node
};

export default GeneralPageTemplate;
