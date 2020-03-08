import React, {useState} from 'react';
import styled from 'styled-components';

import MainMenubar from '../MainMenubar';
import {
  WIDTHS,
  COLORS,
  LOGICAL_COLORS,
  FONT_FAMILIES
} from '../../utils/styleVariables';

import PropTypes from 'prop-types';
import TopInfoBox from './TopInfoBox';
import SideMenu from './SideMenu';
import AboveContentLinks from './AboveContentLinks';

const StyledDiv = styled.div`
  font-family: ${FONT_FAMILIES.ARIAL};

  .top-info-box-wrapper {
    display: flex;
    justify-content: space-between;

    .more-content {
      margin-left: 1em;
    }
  }

  .content-and-sub-compass {
    background-color: white;
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-side {
    border-top: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    display: flex;
  }

  .menu-and-content {
    display: flex;
  }

  .left-side-menu-wrapper {
    min-width: 15%;
    padding: 1em;
  }

  .side-content-wrapper {
    border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    display: flex;
    flex-direction: column;
    min-width: 15%;
    max-width: 25%;
    padding: 1em 1em 0 2em;
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    font-size: 13px;
    padding: 1em;
    width: 70%;

    h1,
    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      text-transform: uppercase;
    }
  }
`;

const GeneralPageTemplate = props => {
  const {
    leftContent,
    topBoxContent,
    bottomContentData,
    menuTitle,
    pagePath,
    pageWideSideContent,
    topRightContent
  } = props;

  const [contentId, setContentId] = useState(bottomContentData[0].id);

  const {
    sideContent: sectionSideContent,
    content,
    title
  } = bottomContentData.find(({id}) => id === contentId);

  const sideMenu = (
    <SideMenu
      currentId={contentId}
      menuData={bottomContentData}
      onClick={id => setContentId(id)}
      title={menuTitle}
    />
  );
  return (
    <StyledDiv>
      <MainMenubar />
      <div className="top-info-box-wrapper">
        <TopInfoBox className="top-info-box">{topBoxContent}</TopInfoBox>
        {topRightContent && (
          <div className="more-content">{topRightContent}</div>
        )}
      </div>

      <div className="content-and-sub-compass">
        <div className="compass">
          <AboveContentLinks
            pagePath={pagePath}
            pageTitle={menuTitle}
            subPageTitle={title}
          />
        </div>
        <div className="content-and-side">
          {Boolean(menuTitle && bottomContentData) && (
            <>
              <div className="left-side-menu-wrapper">
                {leftContent || sideMenu}
              </div>
              <div className="content">{content}</div>
            </>
          )}
          <div className="side-content-wrapper">
            {pageWideSideContent}
            {sectionSideContent}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

GeneralPageTemplate.propTypes = {
  bottomContentData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      content: PropTypes.node
    })
  ),
  leftContent: PropTypes.node,
  menuTitle: PropTypes.string,
  pagePath: PropTypes.string.isRequired,
  pageWideSideContent: PropTypes.node,
  topBoxContent: PropTypes.node.isRequired,
  topRightContent: PropTypes.node
};

export default GeneralPageTemplate;
