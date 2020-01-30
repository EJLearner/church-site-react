import styled from 'styled-components';
import {LOGICAL_COLORS, FONT_FAMILIES} from '../../utils/styleVariables';

const AnnouncementBox = styled.div`
  & > div:first-of-type {
    background-color: ${LOGICAL_COLORS.CT_PRIMARY};
    color: ${LOGICAL_COLORS.CT_TEXT_ON_PRIMARY};
    padding: 1em;
    max-width: 500px;
  }

  h1 {
    font-family: ${FONT_FAMILIES.ARIAL_COND};
    margin-bottom: 0;
    line-height: 0.7;
  }

  h2 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-style: italic;
    margin-top: 0;
  }
`;

export default AnnouncementBox;
