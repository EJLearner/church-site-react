import React, {useState, useEffect} from 'react';

import styled from 'styled-components';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

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

const Title = styled.span`
  font-weight: bold;
`;

const events = [
  {date: '2025-11-28', title: 'Earl’s Birthday', path: 'https://earljones.dev'},
  {
    date: '2019-08-12',
    title: 'April’s Birthday',
    path: 'https://rainyaprilday.com'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 2',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 3',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 4',
    path: 'https://earljones.dev'
  },
  {
    date: '2019-11-28',
    title: 'Earl’s Birthday 5',
    path: 'https://earljones.dev'
  }
];

function renderOrderedEvent(eventIndex) {
  const sortedEvents = events.sort((a, b) => a.date.localeCompare(b.date));
  const {title, path, date} = sortedEvents[eventIndex];

  const header = <Title>{title}</Title>;

  return (
    <div key={title}>
      {path ? <a href={path}>{header}</a> : header}
      <br />
      {date}
    </div>
  );
}

const ScrollingEventsText = () => {
  const sortedEvents = events.sort((a, b) => a.date.localeCompare(b.date));

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

  return (
    <ScrollingEvents fadeIn={fadeIn} fadeOut={fadeOut}>
      {renderOrderedEvent(eventIndex)}
    </ScrollingEvents>
  );
};

export default ScrollingEventsText;
