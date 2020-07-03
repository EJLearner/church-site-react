import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import shoppingUtils from '../../common/components/Shopping/shoppingUtils';
import {Context} from '../../stores/GlobalStoreWrapper';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const StyledWrapperDiv = styled.div`
  position: fixed;

  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  background-color: ${LOGICAL_COLORS.CT_ACCENT};
  bottom: 100px;
  right: 80px;

  a {
    color: black;
  }
`;

function GlobalCartLink() {
  const [state] = useContext(Context);

  const cartHasItems = shoppingUtils.getCartSubTotal(state.cart);

  if (cartHasItems) {
    return (
      <StyledWrapperDiv className="shopping-cart-link">
        <Link to>
          <i className="fa fa-shopping-cart fa-2x" title="Shopping Cart" />
        </Link>
      </StyledWrapperDiv>
    );
  }

  return null;
}

export default GlobalCartLink;
