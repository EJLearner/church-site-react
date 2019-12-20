import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import UpcomingEvent from './UpcomingEvent';

describe('renders', () => {
  let props;

  beforeEach(() => {
    props = {
      date: '2011-05-10',
      title: 'test title',
      lines: ['line 1', 'line 2']
    };
  });

  it('does not crash', () => {
    expect(() => shallow(<UpcomingEvent {...props} />)).not.toThrow();
  });

  it('renders correctly when lines are strings', () => {
    const snap = renderer.create(<UpcomingEvent {...props} />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('renders correctly when lines are react nodes', () => {
    props.lines = [<span key="1">Line 1T</span>, <span key="2">Line 2T</span>];
    const snap = renderer.create(<UpcomingEvent {...props} />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
