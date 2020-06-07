import {
  SHIRT_50_ANNIVERSARY,
  CALENDAR_2020,
  TICKET_ADULT_50_ANNIVERSARY,
  TICKET_YOUTH_50_ANNIVERSARY
} from '../main/JubileeStore/jubileeStoreConstants';

const costs = Object.freeze({
  [SHIRT_50_ANNIVERSARY]: 15,
  [CALENDAR_2020]: 25,
  [TICKET_ADULT_50_ANNIVERSARY]: 100,
  [TICKET_YOUTH_50_ANNIVERSARY]: 50
});

const cart = {};

function initializeIfEmpty(itemId) {
  if (!cart[itemId]) {
    cart[itemId] = {quantity: 0};
  }
}

const purchasesStore = {
  addToCart: (itemId, quantity) => {
    initializeIfEmpty(itemId);

    cart[itemId].quantity += quantity;
  },

  getCart: () => cart,

  getItemCost: (itemId) => costs[itemId],

  getAllItemsTotal: () => {
    return Object.entries(cart).reduce((totalCost, idInfoPair) => {
      const [itemId, itemInfo] = idInfoPair;

      const itemCost = purchasesStore.getItemCost(itemId);
      const itemQuantity = itemInfo.quantity ?? 0;

      return totalCost + itemCost * itemQuantity;
    }, 0);
  },

  getItemQuantity: (itemId) => cart[itemId]?.quantity ?? 0,

  setItemQuantity: (itemId) => {
    initializeIfEmpty(itemId);

    cart[itemId].quantity = 0;
  }
};

export default purchasesStore;
