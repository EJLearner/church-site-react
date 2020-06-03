import React, {useState} from 'react';
import styled from 'styled-components';

import ShoppingCart from '../../common/components/ShoppingCart';

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
function StoreContent(props) {
  const [viewInfo, setViewInfo] = useState({view: VIEWS.STORE_FRONT});
  const {view} = viewInfo;

  const setNewView = (view, itemId) => {
    const viewInfo = {view};

    if (itemId) {
      viewInfo.itemId = itemId;
    }

    setViewInfo(viewInfo);
  };

  if (view === VIEWS.QUANTITY_SELECT) {
    return (
      <QuantitySelect
        itemId={viewInfo.itemId}
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
        onItemClick={(itemId) => setNewView(VIEWS.QUANTITY_SELECT, itemId)}
      />
    </StoreContentStyle>
  );
}

export default StoreContent;
