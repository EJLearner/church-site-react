import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledPurchaseHereLink = styled.p`
  font-style: italic;
  text-align: center;
`;

const PurchaseHereLink = to => {
  return (
    <StyledPurchaseHereLink>
      <Link to={to}>Purchase your tickets here!</Link>
    </StyledPurchaseHereLink>
  );
};

export default PurchaseHereLink;
