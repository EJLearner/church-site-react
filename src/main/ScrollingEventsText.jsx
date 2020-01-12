import React from 'react';

import styled from 'styled-components';
import {LOGICAL_COLORS} from '../utils/styleVariables';

const ScrollingEvents = styled.div`
  color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY}
  max-height: 64px;
  overflow-y: auto;
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

function renderOrderedEvents() {
  return events
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(({date, title, path}) => {
      const header = <Title>{title}</Title>;
      return (
        <div key={title}>
          {path ? <a href={path}>{header}</a> : header}
          <br />
          {date}
          <br />
        </div>
      );
    });
}

const ScrollingEventsText = () => {
  return <ScrollingEvents>{renderOrderedEvents()}</ScrollingEvents>;
};

export default ScrollingEventsText;
