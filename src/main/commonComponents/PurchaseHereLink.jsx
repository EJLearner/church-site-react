import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {COLORS} from '../../utils/styleVariables';

const StyledPurchaseHereLink = styled.p`
  font-style: italic;
  text-align: center;

  a {
    color: ${COLORS.BLUE_50};
    font-weight: bold;
  }
`;

const PurchaseHereLink = to => {
  return (
    <StyledPurchaseHereLink>
      <Link to={to}>Purchase your tickets here!</Link>
    </StyledPurchaseHereLink>
  );
};

export default PurchaseHereLink;
