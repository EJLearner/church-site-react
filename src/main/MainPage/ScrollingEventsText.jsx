import React, {useState, useEffect} from 'react';

import styled from 'styled-components';
import {LOGICAL_COLORS} from '../../utils/styleVariables';
import {scrollingEventsTextInfo} from './mainPageData';
import EventText from './EventText';

const FADE_OUT_TIME_MS = 500;
const FADE_IN_TIME_MS = 750;
const DISPLAY_TIME_MS = 7000;

const ScrollingEvents = styled.div`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY}
  max-height: 64px;
  overflow-y: auto;
  opacity: ${props => (props.fadeOut ? 0 : 1)};
  transition: opacity ${props =>
    props.fadeOut
      ? `.${FADE_OUT_TIME_MS - 50}s ease-out`
      : `.${FADE_IN_TIME_MS}s ease-in`};
`;

const ScrollingEventsText = () => {
  const sortedEvents = scrollingEventsTextInfo.sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const [eventIndex, setEventIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeChunkToUse = 250;
    const totalChunks = DISPLAY_TIME_MS / timeChunkToUse;
    const lastChunkIndex = totalChunks - 1;
    const setFadeOutChunkIndex =
      lastChunkIndex - FADE_OUT_TIME_MS / timeChunkToUse;

    let counter = 0;

    const eventTimer = setInterval(() => {
      if (counter === lastChunkIndex) {
        const lastIndex = sortedEvents.length - 1;
        counter = 0;

        setEventIndex(eventIndex =>
          eventIndex < lastIndex ? eventIndex + 1 : 0
        );

        setFadeOut(false);
        setFadeIn(true);
      }

      if (counter === setFadeOutChunkIndex) {
        setFadeOut(true);
      }

      counter++;
    }, timeChunkToUse);

    return () => clearInterval(eventTimer);
  }, [sortedEvents.length]);

  const {date, path, title} = sortedEvents[eventIndex];

  return (
    <ScrollingEvents fadeIn={fadeIn} fadeOut={fadeOut}>
      <EventText date={date} path={path} title={title} />
    </ScrollingEvents>
  );
};

export default ScrollingEventsText;
