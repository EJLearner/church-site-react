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

  a {
    color: black;
  }
`;

function GlobalCartLink() {
  const [state, dispatch] = useContext(Context);

  const cartHasItems = shoppingUtils.getCartSubTotal(state.cart);

  if (cartHasItems) {
    return (
      <StyledWrapperDiv className="shopping-cart-link">
        <Link
          onClick={() => {
            console.log(
              'GlobalCartLink -> constants.VIEWS.CART',
              constants.VIEWS.CART
            );
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

  return null;
}

export default GlobalCartLink;
