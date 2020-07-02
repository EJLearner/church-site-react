import React, {useContext} from 'react';
import styled from 'styled-components';

import {QuantitySelect} from '../../common/components/Shopping/QuantitySelect';
import ShoppingCart from '../../common/components/Shopping/ShoppingCart';
import StoreFront from '../../common/components/Shopping/StoreFront';
import {Context} from '../../stores/GlobalStoreWrapper';
import constants from '../../utils/constants';

import {STORE_ITEMS} from './jubileeStoreConstants';

const {VIEWS} = constants;

const StoreContentStyle = styled.div`
  .store-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

function StoreContent(props) {
  const [state, dispatch] = useContext(Context);
  const {viewInfo} = state;
  const {view, viewItemId} = viewInfo;

  const setNewView = (view, viewItemId) => {
    const viewInfo = {view};

    if (viewItemId) {
      viewInfo.viewItemId = viewItemId;
    }

    dispatch({type: 'set-view-info', viewInfo});
  };

  if (view === VIEWS.QUANTITY_SELECT) {
    return (
      <QuantitySelect
        cost={STORE_ITEMS[viewItemId].cost}
        itemId={viewItemId}
        onAddToCartClick={(itemId, quantity) =>
          dispatch({type: 'add-to-cart', itemId, quantity})
        }
        onCartNavigate={() => setNewView(VIEWS.CART)}
        onContinueShoppingClick={() => setNewView(VIEWS.STORE_FRONT)}
        onReturnToStoreClick={() => setNewView(VIEWS.STORE_FRONT)}
      />
    );
  }

  if (view === VIEWS.CART) {
    return (
      <ShoppingCart
        cartData={state.cart}
        onItemRemove={(itemId) => dispatch({type: 'remove-item', itemId})}
        onReturnToStoreClick={() => setNewView(VIEWS.STORE_FRONT)}
        storeItems={STORE_ITEMS}
      />
    );
  }

  return (
    <StoreContentStyle>
      <h2>Store</h2>
      <StoreFront
        onItemClick={(viewItemId) =>
          setNewView(VIEWS.QUANTITY_SELECT, viewItemId)
        }
        storeItems={STORE_ITEMS}
      />
    </StoreContentStyle>
  );
}

export default StoreContent;
