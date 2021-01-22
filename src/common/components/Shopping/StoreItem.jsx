import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {STORE_ITEMS} from '../../../main/JubileeStore/jubileeStoreConstants';
import commonUtils from '../../../utils/commonUtils';

const StoreItemStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 45%;
  margin-bottom: 2em;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  img {
    height: 200px;
    width: auto;
  }

  .item-name {
    text-transform: uppercase;
  }

  .item-cost {
    font-weight: bold;
  }
`;

function StoreItem({id, onClick, cost}) {
  const {thumbImageSource, label} = STORE_ITEMS[id];

  return (
    <StoreItemStyling onClick={() => onClick(id)}>
      <img alt={label} src={thumbImageSource} />
      <div className="item-name">{label}</div>
      <div className="item-cost">{commonUtils.formatCurrency(cost)}</div>
    </StoreItemStyling>
  );
}

StoreItem.propTypes = {
  cost: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

StoreItem.defaultProps = {
  title: 'Store'
};

export default StoreItem;
