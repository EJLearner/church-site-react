import PropTypes from 'prop-types';
import React from 'react';

import commonUtils from '../../../utils/commonUtils';

import shoppingUtils from './shoppingUtils';

function ShoppingCart({cartData, onItemRemove, storeItems}) {
  function renderItemLIne(id, info) {
    const quantity = info.quantity;

    if (!quantity) {
      return null;
    }

    const label = storeItems[id].label;

    return (
      <div key={id}>
        Label: {label} Quantity: {quantity} Cost: {storeItems[id].cost}
        <button onClick={() => onItemRemove(id)}>Remove</button>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(cartData).map(([id, info]) => renderItemLIne(id, info))}
      Subtotal:{' '}
      {commonUtils.formatCurrency(shoppingUtils.getCartSubTotal(cartData))}
    </div>
  );
}

ShoppingCart.propTypes = {
  cartData: PropTypes.object.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  storeItems: PropTypes.object.isRequired
};

export default ShoppingCart;
