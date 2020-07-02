function globalReducer(state, action) {
  switch (action.type) {
    case 'add-to-cart': {
      const newCart = {...state.cart};
      if (!newCart[action.itemId]) {
        newCart[action.itemId] = {quantity: 0};
      }

      newCart[action.itemId].quantity += action.quantity;

      state = {...state, cart: newCart};
      return state;
    }

    case 'set-view-info': {
      state = {...state, viewInfo: action.viewInfo};
      return state;
    }

    case 'remove-item': {
      const newCart = {...state.cart};

      if (newCart[action.itemId]) {
        newCart[action.itemId].quantity = 0;
      }

      state = {...state, cart: newCart};
      return state;
    }

    default:
      return state;
  }
}

export default globalReducer;
