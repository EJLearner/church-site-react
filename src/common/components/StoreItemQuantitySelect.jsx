import PropTypes from 'prop-types';
import React from 'react';

function StoreItemQuantitySelect(props) {
  return <div>Store Item Quantity Select {props.id}</div>;
}

StoreItemQuantitySelect.propTypes = {id: PropTypes.string.isRequired};

export default StoreItemQuantitySelect;
