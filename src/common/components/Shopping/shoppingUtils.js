import {STORE_ITEMS} from '../../../main/JubileeStore/jubileeStoreConstants';

export default {
  getCartSubTotal: (cart) => {
    return Object.entries(cart).reduce((currentTotal, idAndInfo) => {
      const [itemId, itemInfo] = idAndInfo;

      if (itemInfo.quantity) {
        currentTotal =
          currentTotal + itemInfo.quantity * STORE_ITEMS[itemId].cost;
      }

      return currentTotal;
    }, 0);
  },

  getShippingCost: () => {
    // just a stub for now until we really come up with a shipping cost algorithm
    return 0;
  },

  getTotalItemsCount: (cart) => {
    return Object.values(cart).reduce((amount, itemInfo) => {
      const {quantity} = itemInfo;
      return amount + (quantity || 0);
    }, 0);
  },

  getItemsForPaypalSubmit: (cart) => {
    return Object.entries(cart).map(([itemId, itemInfo]) => {
      const {quantity} = itemInfo;
      const {cost, id, label} = STORE_ITEMS[itemId];

      return {name: label, itemNumber: id, amount: cost, quantity};
    });
  }
};
