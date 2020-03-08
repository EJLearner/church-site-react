import styled from 'styled-components';
import {LOGICAL_COLORS, COLORS} from '../../utils/styleVariables';

const ContentWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-left: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
  font-size: 13px;
  padding: 1em;
  width: 70%;

  h1,
  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
    margin-top: 0;
    text-transform: uppercase;
  }
`;

export default ContentWrapper;