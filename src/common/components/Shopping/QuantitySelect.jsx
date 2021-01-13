import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled from 'styled-components';

import Button, {
  SHAPES,
  BUTTON_COLORS
} from '../../../ce/components/Reusable/Button/Button';
import Modal from '../../../ce/components/Reusable/Modal/Modal';
import {STORE_ITEMS} from '../../../main/JubileeStore/jubileeStoreConstants';
import commonUtils from '../../../utils/commonUtils';
import {LOGICAL_COLORS} from '../../../utils/styleVariables';
import Select from '../Select';

import shoppingUtils from './shoppingUtils';

const QuantitySelectStyle = styled.div`
  display: flex;

  & > div {
    justify-content: space-between;
    width: 50%;
  }

  .label-quantity-and-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .label {
    font-weight: bold;
    text-transform: uppercase;
  }

  img {
    width: 200px;
    height: auto;
  }
`;

const CartAddedStyle = styled.div`
  .image-and-count {
    display: flex;
  }

  .image-container {
    max-height: 100px;
    max-width: 150px;
  }

  img {
    width: auto;
    height: 100%;
  }

  h1 {
    font-weight: normal;
    color: ${LOGICAL_COLORS.STANDARD_TEXT};
    padding-top: 0.5em;
  }

  .item-count {
    font-weight: bold;
  }

  .full-width-button {
    display: block;
    margin-left: 0;
    margin-top: 1em;
    width: 100%;
  }
`;

export function QuantitySelect({
  cartData,
  cost,
  itemId,
  onAddToCartClick,
  onCartNavigate,
  onContinueShoppingClick,
  onReturnToStoreClick
}) {
  const [stringQuantity, setStringQuantity] = useState('1');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {thumbImageSource, label} = STORE_ITEMS[itemId];

  const addToCart = () => {
    onAddToCartClick(itemId, Number(stringQuantity));
    setShowConfirmation(true);
  };

  const cartItemsCount = shoppingUtils.getTotalItemsCount(cartData);

  return (
    <QuantitySelectStyle>
      <div>
        <img alt={label} src={thumbImageSource} />
      </div>
      <div className="label-quantity-and-buttons">
        <div>
          <div className="label">{label}</div>
          {commonUtils.formatCurrency(cost ?? 0)}
          <div>
            <Select
              label="Quantity"
              labelSameLine
              onChange={(value) => setStringQuantity(value)}
              options={commonUtils
                .range(1, 5)
                .map((item) => String(item))
                .map((item) => ({label: item, value: item}))}
              value={stringQuantity}
            />
          </div>
        </div>
        <div className="bottom-buttons">
          <Button buttonShape={SHAPES.RECT} onClick={addToCart}>
            Add to cart
          </Button>

          <Button buttonShape={SHAPES.RECT} onClick={onReturnToStoreClick}>
            Return to store
          </Button>
        </div>
      </div>
      {showConfirmation && (
        <Modal onCloseClick={() => onContinueShoppingClick()}>
          <CartAddedStyle>
            <div className="image-and-count">
              <div className="image-container">
                <img alt={label} src={thumbImageSource} />
              </div>
              <div>
                <h1>Added to Cart</h1>
                You have{' '}
                <span className="item-count">
                  {cartItemsCount}{' '}
                  {commonUtils.pluralizer('item', cartItemsCount)}
                </span>{' '}
                in your cart
              </div>
            </div>
            <Button
              buttonShape={SHAPES.RECT}
              className="full-width-button"
              onClick={() => onCartNavigate()}
            >
              View your cart
            </Button>
            <Button
              buttonShape={SHAPES.RECT}
              className="full-width-button"
              color={BUTTON_COLORS.BLACK}
              onClick={() => onContinueShoppingClick()}
            >
              Continue Shopping
            </Button>
          </CartAddedStyle>
        </Modal>
      )}
    </QuantitySelectStyle>
  );
}

QuantitySelect.propTypes = {
  cartData: PropTypes.object.isRequired,
  cost: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  onAddToCartClick: PropTypes.func.isRequired,
  onCartNavigate: PropTypes.func.isRequired,
  onContinueShoppingClick: PropTypes.func.isRequired,
  onReturnToStoreClick: PropTypes.func.isRequired
};
