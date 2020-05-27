import PropTypes from 'prop-types';
import React from 'react';

import StoreItem from '../../common/components/StoreItem';

import {
  CALENDAR_2020,
  SHIRT_50_ANNIVERSARY,
  TICKET_ADULT_50_ANNIVERSARY,
  TICKET_YOUTH_50_ANNIVERSARY
} from './jubileeStoreConstants';

function StoreFront({onItemClick}) {
  return (
    <div className="store-items">
      <StoreItem id={CALENDAR_2020} onClick={onItemClick} />
      <StoreItem id={SHIRT_50_ANNIVERSARY} onClick={onItemClick} />
      <StoreItem id={TICKET_ADULT_50_ANNIVERSARY} onClick={onItemClick} />
      <StoreItem id={TICKET_YOUTH_50_ANNIVERSARY} onClick={onItemClick} />
    </div>
  );
}

StoreFront.propTypes = {
  onItemClick: PropTypes.func.isRequired
};
export default StoreFront;
