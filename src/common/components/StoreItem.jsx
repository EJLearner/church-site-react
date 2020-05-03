import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import PlainButton from '../../main/commonComponents/PlainButton';

const StoreItemStyling = styled.div`
  img {
    max-height: 200px;
  }
`;

function StoreItem(props) {
  return (
    <StoreItemStyling>
      <PlainButton onClick={() => props.onClick(props.id)}>
        <img alt={props.name} src={props.imgSource} />
      </PlainButton>

      {props.name}
      {props.cost}
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
