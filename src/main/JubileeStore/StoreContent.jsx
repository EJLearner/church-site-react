import React, {useState} from 'react';
import styled from 'styled-components';

import {QuantitySelect} from './QuantitySelect';
import StoreFront from './StoreFront';
import {CALENDAR_2020} from './jubileeStoreConstants';

const StoreContentStyle = styled.div`
  .store-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

function StoreContent(props) {
  const [quantitySelect, setQuantitySelect] = useState(CALENDAR_2020);

  if (quantitySelect) {
    return <QuantitySelect itemId={quantitySelect} />;
  }
  return (
    <StoreContentStyle>
      <h2>Store</h2>
      <StoreFront setQuantitySelect={setQuantitySelect} />
    </StoreContentStyle>
  );
}

export default StoreContent;
