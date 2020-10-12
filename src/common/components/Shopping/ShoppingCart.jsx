import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../ce/components/Reusable/Button/Button';
import commonUtils from '../../../utils/commonUtils';
import PaypalSubmitOrder from '../PaypalSubmitOrder';

import shoppingUtils from './shoppingUtils';

function ShoppingCart({
  cartData,
  onItemRemove,
  onReturnToStoreClick,
  storeItems
}) {
  function renderItemLIne(id, info) {
    const {quantity} = info;

    if (!quantity) {
      return null;
    }

    const {label} = storeItems[id];

    return (
      <div key={id}>
        Label: {label} Quantity: {quantity} Cost: {storeItems[id].cost}
        <Button onClick={() => onItemRemove(id)}>Remove</Button>
      </div>
    );
  }

  const items = shoppingUtils.getItemsForPaypalSubmit(cartData);
  return (
    <div>
      {Object.entries(cartData).map(([id, info]) => renderItemLIne(id, info))}
      Subtotal:{' '}
      {commonUtils.formatCurrency(shoppingUtils.getCartSubTotal(cartData))}
      <Button onClick={onReturnToStoreClick}>Return to store</Button>
      <PaypalSubmitOrder items={items} shipping />
    </div>
  );
}

ShoppingCart.propTypes = {
  cartData: PropTypes.object.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onReturnToStoreClick: PropTypes.func.isRequired,
  storeItems: PropTypes.object.isRequired
};

export default ShoppingCart;
