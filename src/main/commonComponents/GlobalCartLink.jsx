import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import shoppingUtils from '../../common/components/Shopping/shoppingUtils';
import routePaths from '../../routePaths';
import {Context} from '../../stores/GlobalStoreWrapper';
import constants from '../../utils/constants';
import {LOGICAL_COLORS} from '../../utils/styleVariables';

const StyledWrapperDiv = styled.div`
  position: fixed;

  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  background-color: ${LOGICAL_COLORS.CT_ACCENT};
  bottom: 100px;
  right: 80px;
  transition: transform 0.1s;

  a {
    color: black;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

function GlobalCartLink() {
  const [state, dispatch] = useContext(Context);

  const cartHasItems = shoppingUtils.getCartSubTotal(state.cart);
  const inCart = state.viewInfo.view === constants.VIEWS.CART;

  if (!cartHasItems || inCart) {
    return null;
  }

  return (
    <StyledWrapperDiv className="shopping-cart-link">
      <Link
        onClick={() => {
          dispatch({
            type: 'set-view-info',
            viewInfo: {view: constants.VIEWS.CART}
          });
        }}
        to={routePaths.MAIN_JUBILEE_STORE}
      >
        <i className="fa fa-shopping-cart fa-2x" title="Shopping Cart" />
      </Link>
    </StyledWrapperDiv>
  );
}

export default GlobalCartLink;
