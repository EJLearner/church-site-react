import PropTypes from 'prop-types';
import React, {useState} from 'react';

import AboveContentLinks from './AboveContentLinks';
import ContentAndSides from './ContentAndSides';
import ContentAndSubCompassWrapper from './ContentAndSubCompassWrapper';
import ContentLeftSide from './ContentLeftSide';
import ContentRightSide from './ContentRightSide';
import ContentWrapper from './ContentWrapper';
import SideMenu from './SideMenu';
import StandardPageWrapper from './StandardPageWrapper';
import TopInfoBox from './TopInfoBox';
import TopInfoBoxWrapper from './TopInfoBoxWrapper';

const GeneralPageTemplate = (props) => {
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
      onClick={(id) => setContentId(id)}
      title={menuTitle}
    />
  );
  return (
    <StandardPageWrapper>
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
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired
    })
  ),
  leftContent: PropTypes.node,
  menuTitle: PropTypes.string,
  pagePath: PropTypes.string.isRequired,
  pageWideSideContent: PropTypes.node,
  topBoxContent: PropTypes.node.isRequired
};

export default GeneralPageTemplate;
