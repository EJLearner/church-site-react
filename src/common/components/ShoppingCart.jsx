import React from 'react';

import {STORE_ITEMS} from '../../main/JubileeStore/jubileeStoreConstants';
import purchasesStore from '../../stores/purchasesStore';

function ShoppingCart(props) {
  // eslint-disable-next-line react/prop-types
  function renderItemLIne({id, label}) {
    const quantity = purchasesStore.getItemQuantity(id);

    if (!quantity) {
      return null;
    }

    return (
      <div key={id}>
        Label: {label} Quantity: {quantity} Cost:{' '}
        {purchasesStore.getItemCost(id)}
        <button onClick={() => purchasesStore.setItemQuantity(0)}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      {Object.values(STORE_ITEMS).map((storeItem) => renderItemLIne(storeItem))}
      Subtotal: {purchasesStore.getAllItemsTotal()}
    </div>
  );
}

ShoppingCart.propTypes = {};

export default ShoppingCart;
