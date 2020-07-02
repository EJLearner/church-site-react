import React, {useContext} from 'react';
import styled from 'styled-components';

import shoppingUtils from '../../common/components/Shopping/shoppingUtils';
import {Context} from '../../stores/GlobalStoreWrapper';

const StyledWrapperDiv = styled.div`
  position: fixed;

  bottom: 100px;
  right: 80px;
`;

function GlobalCartLink() {
  const [state] = useContext(Context);

  const cartHasItems = shoppingUtils.getCartSubTotal(state.cart);

  if (cartHasItems) {
    return (
      <StyledWrapperDiv className="shopping-cart-link">
        Shopping Cart
      </StyledWrapperDiv>
    );
  }

  return null;
}

export default GlobalCartLink;
