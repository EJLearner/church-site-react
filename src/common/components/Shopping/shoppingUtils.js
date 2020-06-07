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
  }
};
