import styled from 'styled-components';
import {
  LOGICAL_COLORS,
  COLORS,
  FONT_FAMILIES
} from '../../utils/styleVariables';

const ContentWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
  font-size: 13px;
  line-height: 150%;
  padding: 1em;
  width: 70%;

  h2 {
    font-family: ${FONT_FAMILIES.ROBOTO};
    font-size: 40px;
    letter-spacing: 0.02em;
    line-height: 100%;
  }

  h3 {
    font-family: ${FONT_FAMILIES.ARIAL};
    font-size: 15px;
    letter-spacing: 0.01em;
    line-height: 130%;
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  h1,
  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    margin-top: 0.03em;
    text-transform: uppercase;
  }
`;

export default ContentWrapper;
