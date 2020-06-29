import React from 'react';
import styled from 'styled-components';

import powerPointFile from '../../../assets/main/2020-graduates.pptx';
import slideshow from '../../../assets/main/images/slideshow.png';
import {LOGICAL_COLORS} from '../../../utils/styleVariables';

const StyleWrapper = styled.div`
  text-align: center;

  img {
    width 95%;
    height: auto;
  }

  em {
    color: ${LOGICAL_COLORS.CT_ACCENT};
    font-weight: bold;
    font-style: normal;
    text-transform: uppercase;
  }
`;

// TODO: remove this after it stops showing
function GraduateSlideshow() {
  return (
    <StyleWrapper>
      <h1>Congratulations Graduates!</h1>

      <a href={powerPointFile}>
        <img alt="Graduates Slideshow" src={slideshow} />
      </a>
    </StyleWrapper>
  );
}

export default GraduateSlideshow;
