import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../ce/components/Reusable/Button/Button';

import HiddenInput from './HiddenInput';

function PaypalSubmitOrder({items, shipping}) {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
      <HiddenInput name="cmd" value="_cart" />
      <HiddenInput name="upload" value="1" />
      <HiddenInput name="business" value="giving@thecitytemple.org" />

      {/* URL's to send users when they have completed or canceled */}
      <HiddenInput name="return" value="https://www.thecitytemple.org" />
      <HiddenInput name="cancel_return" value="https://www.thecitytemple.org" />

      {/* This text is shown on a button on Paypal when user completes payment */}
      <HiddenInput name="cbt" value="Back to The City Temple" />

      {!shipping && <HiddenInput name="no_shipping" value="1" />}

      {/* Product lines */}
      {items.map((item, index) => {
        const {name, itemNumber, amount, quantity} = item;
        const number = index + 1;

        return (
          <React.Fragment key={itemNumber}>
            <HiddenInput name={`item_name_${number}`} value={name} />
            <HiddenInput name={`item_number_${number}`} value={itemNumber} />
            <HiddenInput name={`amount_${number}`} value={String(amount)} />
            <HiddenInput name={`quantity_${number}`} value={String(quantity)} />
          </React.Fragment>
        );
      })}

      <Button name="submit" type="submit" value="Checkout">
        Checkout
      </Button>
    </form>
  );
}

PaypalSubmitOrder.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      itemNumber: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number
    })
  ),
  shipping: PropTypes.bool.isRequired
};

export default PaypalSubmitOrder;
