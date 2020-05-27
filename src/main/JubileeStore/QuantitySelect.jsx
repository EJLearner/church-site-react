import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled from 'styled-components';

import Button, {SHAPES} from '../../ce/components/Reusable/Button/Button';
import Select from '../../common/components/Select';
import purchasesStore from '../../stores/purchasesStore';
import commonUtils from '../../utils/commonUtils';

import {STORE_ITEMS} from './jubileeStoreConstants';

const QuantitySelectStyle = styled.div`
  display: flex;

  & > div {
    justify-content: space-between;
    width: 50%;
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

export function QuantitySelect({itemId, onCartNavigate}) {
  const [stringQuantity, setStringQuantity] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {thumbImageSource, label} = STORE_ITEMS[itemId];

  const addToCart = () => {
    purchasesStore.addToCart(itemId, Number(stringQuantity));
    setShowConfirmation(true);
  };

  return (
    <QuantitySelectStyle>
      <div>
        <img alt={label} src={thumbImageSource} />
      </div>
      <div className="qs-right-side">
        <div className="qs-right-top">
          <div className="label">{label}</div>
          {commonUtils.formatCurrency(purchasesStore.getCost(itemId))}
          <div>
            <Select
              label="Quantity"
              onChange={(value) => setStringQuantity(value)}
              options={commonUtils
                .range(1, 5)
                .map((item) => String(item))
                .map((item) => ({label: item, value: item}))}
              value={stringQuantity}
            />
          </div>
        </div>
        <div className="qs-right-bottom">
          <Button buttonShape={SHAPES.RECT} onClick={addToCart}>
            Add to cart
          </Button>
        </div>
      </div>
      {showConfirmation && (
        <div>
          <div>
            <Button buttonShape={SHAPES.RECT} onClick={() => onCartNavigate()}>
              View your cart
            </Button>
          </div>
          <div>
            <Button
              buttonShape={SHAPES.RECT}
              onClick={() => setShowConfirmation(false)}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </QuantitySelectStyle>
  );
}

QuantitySelect.propTypes = {
  itemId: PropTypes.string.isRequired,
  onCartNavigate: PropTypes.func.isRequired
};
