import React, {useReducer} from 'react';
import styled from 'styled-components';

import {QuantitySelect} from '../../common/components/Shopping/QuantitySelect';
import ShoppingCart from '../../common/components/Shopping/ShoppingCart';
import StoreFront from '../../common/components/Shopping/StoreFront';

import {STORE_ITEMS} from './jubileeStoreConstants';

const StoreContentStyle = styled.div`
  .store-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const VIEWS = {
  CART: 'cart',
  QUANTITY_SELECT: 'quantitySelect',
  STORE_FRONT: 'storeFront'
};

let persistentState = {
  cart: {},
  viewInfo: {view: VIEWS.STORE_FRONT}
};

function storeDataReducer(state, action) {
  switch (action.type) {
    case 'add-to-cart': {
      const newCart = {...persistentState.cart};
      if (!newCart[action.itemId]) {
        newCart[action.itemId] = {quantity: 0};
      }

      newCart[action.itemId].quantity += action.quantity;

      persistentState = {...persistentState, cart: newCart};
      return persistentState;
    }

    case 'set-view-info': {
      persistentState = {...persistentState, viewInfo: action.viewInfo};
      return persistentState;
    }

    case 'remove-item': {
      const newCart = {...persistentState.cart};

      if (newCart[action.itemId]) {
        newCart[action.itemId].quantity = 0;
      }

      persistentState = {...persistentState, cart: newCart};
      return persistentState;
    }

    default:
      return persistentState;
  }
}

function StoreContent(props) {
  const [storeData, storeDataDispatch] = useReducer(
    storeDataReducer,
    persistentState
  );
  const {viewInfo} = storeData;
  const {view, viewItemId} = viewInfo;

  const setNewView = (view, viewItemId) => {
    const viewInfo = {view};

    if (viewItemId) {
      viewInfo.viewItemId = viewItemId;
    }

    storeDataDispatch({type: 'set-view-info', viewInfo});
  };

  if (view === VIEWS.QUANTITY_SELECT) {
    return (
      <QuantitySelect
        cost={STORE_ITEMS[viewItemId].cost}
        itemId={viewItemId}
        onAddToCartClick={(itemId, quantity) =>
          storeDataDispatch({type: 'add-to-cart', itemId, quantity})
        }
        onCartNavigate={() => setNewView(VIEWS.CART)}
        onContinueShoppingClick={() => setNewView(VIEWS.STORE_FRONT)}
      />
    );
  }

  if (view === VIEWS.CART) {
    return (
      <ShoppingCart
        cartData={storeData.cart}
        onItemRemove={(itemId) =>
          storeDataDispatch({type: 'remove-item', itemId})
        }
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
