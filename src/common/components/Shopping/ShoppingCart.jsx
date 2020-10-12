import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../../ce/components/Reusable/Button/Button';
import commonUtils from '../../../utils/commonUtils';
import {FONT_FAMILIES, LOGICAL_COLORS} from '../../../utils/styleVariables';
import PaypalSubmitOrder from '../PaypalSubmitOrder';

import shoppingUtils from './shoppingUtils';

// const testCartData = {
//   'jubilee-2020-calendar': {
//     quantity: 1
//   },
//   '50th-anniversary-shirt': {
//     quantity: 2
//   },
//   '50th-anniversary-banquest-ticket-child': {
//     quantity: 3
//   },
//   '50th-anniversary-banquest-ticket-adult': {
//     quantity: 1
//   }
// };

const StyledCart = styled.div`
  h3 {
    color: ${LOGICAL_COLORS.STANDARD_TEXT};
    font-family: ${FONT_FAMILIES.ARIAL};
    font-size: 28px;
  }

  .count {
    font-size: 14px;
    vertical-align: bottom;
  }

  .number {
    background-color: ${LOGICAL_COLORS.CT_ACCENT};
    border-radius: 50%;
    padding: 1px 6px;
    color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};
  }
`;

function renderTotalItemCount(cartData) {
  const count = shoppingUtils.getTotalItemsCount(cartData);
  return (
    <span className="count">
      <span className="number">{count}</span> {count === 1 ? 'Item' : 'Items'}
    </span>
  );
}

function renderItemline(id, info, onItemRemove, storeItems) {
  const {quantity} = info;

  if (!quantity) {
    return null;
  }

  const {cost, label} = storeItems[id];

  return (
    <div key={id}>
      Label: {label} Quantity: {quantity} Cost: {cost}
      <Button onClick={() => onItemRemove(id)}>Remove</Button>
    </div>
  );
}

function ShoppingCart({
  cartData,
  onItemRemove,
  onReturnToStoreClick,
  storeItems
}) {
  const items = shoppingUtils.getItemsForPaypalSubmit(cartData);
  return (
    <StyledCart>
      <h3>Shopping Cart {renderTotalItemCount(cartData)}</h3>
      {Object.entries(cartData).map(([id, info]) =>
        renderItemline(id, info, onItemRemove, storeItems)
      )}
      Subtotal:{' '}
      {commonUtils.formatCurrency(shoppingUtils.getCartSubTotal(cartData))}
      <Button onClick={onReturnToStoreClick}>Return to store</Button>
      <PaypalSubmitOrder items={items} shipping />
    </StyledCart>
  );
}

ShoppingCart.propTypes = {
  cartData: PropTypes.object.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  onReturnToStoreClick: PropTypes.func.isRequired,
  storeItems: PropTypes.object.isRequired
};

export default ShoppingCart;
