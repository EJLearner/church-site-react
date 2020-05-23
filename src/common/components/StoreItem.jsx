import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {STORE_ITEMS} from '../../main/JubileeStore/jubileeStoreConstants';
import purchasesStore from '../../stores/purchasesStore';
import commonUtils from '../../utils/commonUtils';

const StoreItemStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 45%;
  margin-bottom: 2em;

  img {
    height: 200px;
    width: auto;

    &:hover {
      cursor: pointer;
    }
  }

  .item-name {
    text-transform: uppercase;
  }

  .item-cost {
    font-weight: bold;
  }
`;

function StoreItem(props) {
  const {thumbImageSource, label} = STORE_ITEMS[props.id];

  return (
    <StoreItemStyling>
      <img
        alt={label}
        onClick={() => props.onClick(props.id)}
        src={thumbImageSource}
      />

      <div className="item-name">{label}</div>
      <div className="item-cost">
        {commonUtils.formatCurrency(purchasesStore.getCost(props.id))}
      </div>
    </StoreItemStyling>
  );
}

StoreItem.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

StoreItem.defaultProps = {
  title: 'Store'
};

export default StoreItem;
