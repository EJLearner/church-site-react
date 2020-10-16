import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../../ce/components/Reusable/Button/Button';
import ContentRightSide from '../../../main/commonComponents/ContentRightSide';
import ContentWrapper from '../../../main/commonComponents/ContentWrapper';
import commonUtils from '../../../utils/commonUtils';
import {
  COLORS,
  FONT_FAMILIES,
  LOGICAL_COLORS
} from '../../../utils/styleVariables';
import PaypalSubmitOrder from '../PaypalSubmitOrder';

import shoppingUtils from './shoppingUtils';

const testCartData = {
  'jubilee-2020-calendar': {
    quantity: 1
  },
  '50th-anniversary-shirt': {
    quantity: 2
  },
  '50th-anniversary-banquest-ticket-child': {
    quantity: 3
  },
  '50th-anniversary-banquest-ticket-adult': {
    quantity: 1
  }
};

const StyledCart = styled.div`
  .items-and-order-summary {
    display: flex;

    & > div {
      padding-left: 1em;
      padding-right: 1em;
    }
  }

  .cart-side {
    border-right: 1px solid ${COLORS.GRAY217};
    width: 80%;
  }

  .summary-side {
    align-self: flex-start;
    padding-top: 4em;
    position: sticky;
    top: 20px;

    .costs {
      display: grid;
      grid-template-columns: 80% 20%;
    }
  }

  h3 {
    color: ${LOGICAL_COLORS.STANDARD_TEXT};
    font-family: ${FONT_FAMILIES.ARIAL};
    font-size: 28px;
    margin-bottom: 1em;
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
    display: grid;
    grid-template-columns: [item]25% [description]auto [price]10% [remove]10%;
    grid-template-rows: [header]40px [line]1px;
    place-items: center;
    text-transform: uppercase;

    .line {
      background-color: ${COLORS.GRAY180};
      grid-column-start: 1;
      grid-column-end: 5;
      height: 1px;
      width: 100%;
    }

    img {
      max-height: 150px;
      max-width: 100%;
      margin: auto;
    }

    > div {
      align-self: center;
      margin-bottom: 1em;
    }

    .description,
    .price {
    }

    i {
      color: ${COLORS.GRAY63};

      &:hover {
        color: ${LOGICAL_COLORS.CT_ACCENT};
        cursor: pointer;
      }
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
        <i
          className="close-icon fa fa-2x fa-times-circle"
          onClick={() => onItemRemove(id)}
          tabIndex="0"
          title="Close Button"
        />
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
  const items = shoppingUtils.getItemsForPaypalSubmit(testCartData);
  const itemsTotal = shoppingUtils.getCartSubTotal(testCartData);
  const shippingCost = shoppingUtils.getShippingCost(testCartData);

  return (
    <StyledCart>
      <div className="items-and-order-summary">
        <ContentWrapper>
          <h2>Store</h2>
          <h3>Shopping Cart {renderTotalItemCount(testCartData)}</h3>
          <div className="cart-items-grid">
            <div>Item</div>
            <div>Description</div>
            <div>Price</div>
            <div>Remove</div>
            <div className="line" />
            {Object.entries(testCartData).map(([id, info]) =>
              renderItemline(id, info, onItemRemove, storeItems)
            )}
          </div>
        </ContentWrapper>
        <ContentRightSide>
          <div className="summary-side">
            <h4>Order Summary</h4>
            <div className="costs">
              <div>Subtotal:</div>
              <div>{commonUtils.formatCurrency(itemsTotal)}</div>
              <div>Ground Shipping:</div>
              <div>{commonUtils.formatShippingCost(shippingCost)}</div>
              <div>Total:</div>
              <div>{commonUtils.formatCurrency(itemsTotal + shippingCost)}</div>
            </div>
          </div>
        </ContentRightSide>
      </div>
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
