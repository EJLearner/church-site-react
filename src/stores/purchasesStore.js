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

const purchasesStore = {
  getCost: (itemId) => costs[itemId],

  addToCart: (itemId, quantity) => {
    if (!cart[itemId]) {
      cart[itemId] = {quantity: 0};
    }

    cart[itemId].quantity += quantity;
  },

  getCartAmount: (itemId) => cart[itemId]?.quantity ?? 0
};

export default purchasesStore;
