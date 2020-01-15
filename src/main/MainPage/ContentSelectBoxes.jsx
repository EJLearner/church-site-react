import React, {useState} from 'react';
import styled from 'styled-components';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {contentSelectInfo} from './mainPageData';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const ContentSelectBoxesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled.div`
  margin: 3em;
`;

const EventBox = styled.div`
  background-color: ${LOGICAL_COLORS.CT_PRIMARY};
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  font-weight: bold;
  font-size: 90%;
  margin: 0 0.5em;
  min-height: 150px;
  padding: 1em 1em 0 1em;
  width: 120px;
  text-transform: uppercase;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
`;

const ContentSelectBoxes = () => {
  const [contentIndex] = useState(0);

  const {title, thumbnail} = contentSelectInfo[contentIndex];
  console.log('TCL: ContentSelectBoxes -> thumbnail', thumbnail);

  return (
    <ContentSelectBoxesWrapper>
      <ArrowIcon>
        <FontAwesomeIcon icon={faAngleLeft} size="4x" />
      </ArrowIcon>
      <EventBox>
        <Thumbnail src={thumbnail} />
        {title}
      </EventBox>
      <EventBox>
        <Thumbnail src={thumbnail} />
        {title}
      </EventBox>
      <ArrowIcon>
        <FontAwesomeIcon icon={faAngleRight} size="4x" />
      </ArrowIcon>
    </ContentSelectBoxesWrapper>
  );
};

export default ContentSelectBoxes;
