import styled from 'styled-components';
import {LOGICAL_COLORS, FONT_FAMILIES} from '../../utils/styleVariables';

const AnnouncementBox = styled.div`
  // regular text
  font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};

  & > div:first-of-type {
    background-color: ${LOGICAL_COLORS.CT_PRIMARY};
    color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
    padding: 1em;
    max-width: 500px;
  }

  // title
  h1 {
    font-family: ${FONT_FAMILIES.BEBAS};
    font-size: 45px;
    margin-bottom: 0;
    line-height: 0.9;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  // subtitle
  h2 {
    font-family: ${FONT_FAMILIES.BEBAS};
    margin-top: 8px;
    letter-spacing: 2px;
  }
`;

export default AnnouncementBox;
