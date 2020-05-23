import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import purchasesStore from '../../stores/purchasesStore';

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

export function QuantitySelect({itemId}) {
  const {thumbImageSource, label} = STORE_ITEMS[itemId];

  return (
    <QuantitySelectStyle>
      <div>
        <img alt={label} src={thumbImageSource} />
      </div>
      <div>
        <div className="label">{label}</div>
        {purchasesStore.getCost(itemId)}
      </div>
    </QuantitySelectStyle>
  );
}

QuantitySelect.propTypes = {
  itemId: PropTypes.string.isRequired
};
