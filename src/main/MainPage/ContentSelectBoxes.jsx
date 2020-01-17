import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {contentSelectInfo} from './mainPageData';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import ContentSelectArrow from './ContentSelectArrow';

const ContentSelectBoxesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EventBox = styled.div`
  background-color: ${props =>
    props.selected ? LOGICAL_COLORS.CT_ACCENT : LOGICAL_COLORS.CT_PRIMARY};
  box-sizing: content-box;
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
  cursor: pointer;
  font-weight: bold;
  font-size: 90%;
  margin: 0 0.5em;
  min-height: 150px;
  padding: 1em 1em 0 1em;
  text-transform: uppercase;
  width: 120px;

  &:focus {
    outline: 2px solid blue;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
`;

function handleKeyPress(onContentSelect, index) {
  return event => {
    const keyIsHandled = ['Enter', ' '].includes(event.key);
    if (keyIsHandled) {
      onContentSelect(index);
      event.preventDefault();
    }
  };
}

const ContentSelectBoxes = ({contentIndex, onContentSelect}) => {
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
      {currentlyDisplayedBoxes.map((contentSelect, index) => (
        <EventBox
          key={contentSelect.title}
          onClick={() => onContentSelect(index)}
          onKeyPress={handleKeyPress(onContentSelect, index)}
          role="button"
          selected={index === contentIndex}
          tabIndex="0"
        >
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

ContentSelectBoxes.propTypes = {
  contentIndex: PropTypes.number.isRequired,
  onContentSelect: PropTypes.func.isRequired
};

export default ContentSelectBoxes;
