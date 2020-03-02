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
    margin: ${WIDTHS.SIDE_CONTENT_PADDING};

    .top-info-box {
      min-width: 50%;
    }

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

  .side-content-wrapper {
    border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    display: flex;
    flex-direction: column;
    min-width: 20%;
    max-width: 25%;
    padding: 1em 2em 0 2em;
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
      text-transform: uppercase;
    }
  }
`;

const GeneralPageTemplate = props => {
  const {
    topBoxContent,
    bottomContentData,
    menuTitle,
    pagePath,
    pageWideSideContent,
    topRightContent
  } = props;

  const [contentId, setContentId] = useState(bottomContentData?.[0].id);

  const {
    sideContent: sectionSideContent,
    content,
    title
  } = bottomContentData.find(({id}) => id === contentId);

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
            <div className="menu-and-content">
              <SideMenu
                currentId={contentId}
                menuData={bottomContentData}
                onClick={id => setContentId(id)}
                title={menuTitle}
              />
              <div className="content">{content}</div>
            </div>
          )}
          {pageWideSideContent || sectionSideContent ? (
            <div className="side-content-wrapper">
              {pageWideSideContent}
              {sectionSideContent}
            </div>
          ) : null}
        </div>
      </div>
    </StyledDiv>
  );
};

GeneralPageTemplate.propTypes = {
  bottomContentData: PropTypes.array,
  menuTitle: PropTypes.string,
  pagePath: PropTypes.string.isRequired,
  pageWideSideContent: PropTypes.node,
  topBoxContent: PropTypes.node.isRequired,
  topRightContent: PropTypes.node
};

export default GeneralPageTemplate;
