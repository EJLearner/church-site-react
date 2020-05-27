import React from 'react';

import {STORE_ITEMS} from '../../main/JubileeStore/jubileeStoreConstants';
import purchasesStore from '../../stores/purchasesStore';

function ShoppingCart(props) {
  return (
    <div>
      {Object.values(STORE_ITEMS).reduce((itemsList, {id, label}) => {
        const quantity = purchasesStore.getCartAmount(id);
        if (quantity) {
          itemsList.push(
            <div key={id}>
              Label: {label} Quantity: {quantity}
            </div>
          );
        }

        return itemsList;
      }, [])}
    </div>
  );
}

ShoppingCart.propTypes = {};

export default ShoppingCart;
