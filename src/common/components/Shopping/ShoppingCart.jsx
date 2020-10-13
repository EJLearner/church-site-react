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
  }

  .cart-items-grid {
    column-gap: 25px;
    row-gap: 35px;
    display: grid;
    grid-template-columns: 25% auto 10% 10%;
    place-items: center;
    text-transform: uppercase;

    img {
      max-height: 200px;
      max-width: 100%;
      margin: auto;
    }

    > div {
      align-self: center;
    }

    .description,
    .price {
      justify-self: start;
    }
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

  const {cost, label, thumbImageSource} = storeItems[id];

  return (
    <React.Fragment key={id}>
      <div className="item-picture">
        <img alt={label} src={thumbImageSource} />
      </div>
      <div className="description">{label}</div>
      <div className="description">{commonUtils.formatCurrency(cost)}</div>
      <div>
        <Button onClick={() => onItemRemove(id)}>X</Button>
      </div>
    </React.Fragment>
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
      <div className="cart-items-grid">
        <div>Item</div>
        <div>Description</div>
        <div>Price</div>
        <div>Remove</div>
        {Object.entries(cartData).map(([id, info]) =>
          renderItemline(id, info, onItemRemove, storeItems)
        )}
      </div>
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
