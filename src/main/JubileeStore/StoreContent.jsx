import React, {useReducer} from 'react';
import styled from 'styled-components';

import ShoppingCart from '../../common/components/ShoppingCart';
import purchasesStore from '../../stores/purchasesStore';

import {QuantitySelect} from './QuantitySelect';
import StoreFront from './StoreFront';

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

function storeDataReducer(state, action) {
  switch (action.type) {
    case 'add-to-cart':
      purchasesStore.addToCart(action.itemId, action.quantity);

      return {...state, cart: purchasesStore.getCart()};

    case 'set-view-info': {
      return {...state, viewInfo: action.viewInfo};
    }

    default:
      break;
  }
}

function StoreContent(props) {
  const [storeData, storeDataDispatch] = useReducer(storeDataReducer, {
    viewInfo: {view: VIEWS.STORE_FRONT}
  });
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
        itemId={viewItemId}
        onCartNavigate={() => setNewView(VIEWS.CART)}
        onContinueShoppingClick={() => setNewView(VIEWS.STORE_FRONT)}
      />
    );
  }

  if (view === VIEWS.CART) {
    return <ShoppingCart />;
  }

  return (
    <StoreContentStyle>
      <h2>Store</h2>
      <StoreFront
        onItemClick={(viewItemId) =>
          setNewView(VIEWS.QUANTITY_SELECT, viewItemId)
        }
      />
    </StoreContentStyle>
  );
}

export default StoreContent;
