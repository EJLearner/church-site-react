import React from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router';
import styled from 'styled-components';

import {LOGICAL_COLORS} from '../../utils/styleVariables';
import MainMenubar from '../MainMenubar';
import ContentAndSubCompassWrapper from '../commonComponents/ContentAndSubCompassWrapper';
import StandardPageWrapper from '../commonComponents/StandardPageWrapper';

import getAnnouncementsContentArray from './AnnouncementsContent/getAnnouncementsContentArray';

const FIELD_IDS = Object.freeze({
  titleSearchId: 'title-search',
  preacherSearchId: 'preacher-search',
  dateSearchId: 'date-search',
  scriptureSearchId: 'scripture-search'
});

export const initialSearchInfo = {
  [FIELD_IDS.titleSearchId]: '',
  [FIELD_IDS.preacherSearchId]: '',
  [FIELD_IDS.dateSearchId]: '',
  [FIELD_IDS.scriptureSearchId]: ''
};

const StyleWrapper = styled.div`
  padding: 1em 0;

  .content {
    align-items: center;
    display: flex;
    flex-direction: column;

    & > * {
      width: 60%;
    }
  }

  a.flyer-image-link {
    display: block;
    text-align: center;
    width: 80%;

    img {
      width: 100%;
    }
  }

  h2 {
    align-self: start;
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  h3 {
    color: ${LOGICAL_COLORS.STANDARD_TEXT};
    font-weight: bold;
  }

  .highlighted {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    font-weight: bolder;
  }
`;

const AnnouncementsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scrollElement = document.querySelector(location.hash);
      scrollElement?.scrollIntoView({behavior: 'smooth'});
    }
  }, [location]);

  const contentArray = getAnnouncementsContentArray();

  const renderedContent = contentArray.length ? (
    contentArray
  ) : (
    <>
      <h2>Empty</h2>
      <p>There are currently no announcements.</p>
    </>
  );

  return (
    <StandardPageWrapper>
      <MainMenubar />
      <ContentAndSubCompassWrapper>
        <StyleWrapper>{renderedContent}</StyleWrapper>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default AnnouncementsPage;
