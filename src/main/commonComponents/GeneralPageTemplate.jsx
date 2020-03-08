import React, {useState} from 'react';

import MainMenubar from '../MainMenubar';

import PropTypes from 'prop-types';
import TopInfoBox from './TopInfoBox';
import SideMenu from './SideMenu';
import AboveContentLinks from './AboveContentLinks';
import TopInfoBoxWrapper from './TopInfoBoxWrapper';
import ContentAndSubCompassWrapper from './ContentAndSubCompassWrapper';
import ContentAndSides from './ContentAndSides';
import ContentLeftSide from './ContentLeftSide';
import ContentWrapper from './ContentWrapper';
import ContentRightSide from './ContentRightSide';
import StandardPageWrapper from './StandardPageWrapper';

const GeneralPageTemplate = props => {
  const {
    leftContent,
    topBoxContent,
    bottomContentData,
    menuTitle,
    pagePath,
    pageWideSideContent
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
    <StandardPageWrapper>
      <MainMenubar />
      <TopInfoBoxWrapper>
        <TopInfoBox>{topBoxContent}</TopInfoBox>
      </TopInfoBoxWrapper>

      <ContentAndSubCompassWrapper>
        <AboveContentLinks
          pagePath={pagePath}
          pageTitle={menuTitle}
          subPageTitle={title}
        />
        <ContentAndSides>
          <ContentLeftSide>
            {leftContent || (menuTitle && sideMenu)}
          </ContentLeftSide>
          <ContentWrapper>{content}</ContentWrapper>
          <ContentRightSide>
            {pageWideSideContent}
            {sectionSideContent}
          </ContentRightSide>
        </ContentAndSides>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
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
  topBoxContent: PropTypes.node.isRequired
};

export default GeneralPageTemplate;
