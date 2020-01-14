import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Title = styled.span`
  font-weight: bold;
`;

EventText.propTypes = {
  date: PropTypes.string.isRequired,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

function EventText({title, path, date}) {
  const header = <Title>{title}</Title>;

  return (
    <div key={title}>
      {path ? <a href={path}>{header}</a> : header}
      <br />
      {date}
    </div>
  );
}

export default EventText;
