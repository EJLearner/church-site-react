import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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
  return (
    <StoreItemStyling>
      <img
        alt={props.name}
        onClick={() => props.onClick(props.id)}
        src={props.imgSource}
      />

      <div className="item-name">{props.name}</div>
      <div className="item-cost">${Number(props.cost).toFixed(2)}</div>
    </StoreItemStyling>
  );
}

StoreItem.propTypes = {
  cost: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imgSource: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

StoreItem.defaultProps = {
  title: 'Store'
};

export default StoreItem;
