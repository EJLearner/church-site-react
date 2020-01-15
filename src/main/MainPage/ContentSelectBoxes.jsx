import React, {useState} from 'react';
import styled from 'styled-components';

import {contentSelectInfo} from './mainPageData';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import ContentSelectArrow from './ContentSelectArrow';

const ContentSelectBoxesWrapper = styled.div`
  display: flex;
  align-items: center;
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
  const [firstDisplayedEventIndex, setFirstDisplayedEventIndex] = useState(0);
  const eventBoxesToShow = 3;

  const currentlyDisplayedBoxes = contentSelectInfo.slice(
    firstDisplayedEventIndex,
    firstDisplayedEventIndex + eventBoxesToShow
  );

  const showLeftArrow = firstDisplayedEventIndex !== 0;
  const showRightArrow =
    contentSelectInfo.length > firstDisplayedEventIndex + eventBoxesToShow;

  const moveBoxesLeft = () => {
    setFirstDisplayedEventIndex(firstDisplayedEventIndex - 1);
  };

  const moveBoxesRight = () => {
    setFirstDisplayedEventIndex(firstDisplayedEventIndex + 1);
  };

  return (
    <ContentSelectBoxesWrapper>
      <ContentSelectArrow
        onClick={moveBoxesLeft}
        show={showLeftArrow}
        type="left"
      />
      {currentlyDisplayedBoxes.map(contentSelect => (
        <EventBox key={contentSelect.title}>
          <Thumbnail src={contentSelect.thumbnail} />
          {contentSelect.title}
        </EventBox>
      ))}
      <ContentSelectArrow
        onClick={moveBoxesRight}
        show={showRightArrow}
        type="right"
      />
    </ContentSelectBoxesWrapper>
  );
};

export default ContentSelectBoxes;
