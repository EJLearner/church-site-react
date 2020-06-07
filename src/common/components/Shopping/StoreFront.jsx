import PropTypes from 'prop-types';
import React from 'react';

import StoreItem from './StoreItem';

function StoreFront({onItemClick, storeItems}) {
  return (
    <div className="store-items">
      {Object.entries(storeItems).map(([itemId, itemInfo]) => (
        <StoreItem
          cost={itemInfo.cost}
          id={itemId}
          key={itemId}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

StoreFront.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  storeItems: PropTypes.PropTypes.object.isRequired
};
export default StoreFront;
