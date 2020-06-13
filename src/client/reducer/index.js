import actionTypes from '../constants/actionTypes';
import currencies from '../constants/currencies';
import frames from '../constants/frames';
import calculatePrice from '../utils/calculatePrice';
import copyObject from '../utils/copyObject';

const emptyCart = {
  items: {},
  totalPrice: {
    [currencies.EUR.value]: 0,
    [currencies.USD.value]: 0
  },
  delivery: {
    [currencies.EUR.value]: 7.9,
    [currencies.USD.value]: 9.9
  }
};

const initialState = {
  products: [],
  categories: [],
  frame: frames.PURCHASE_HISTORY,
  currency: currencies.EUR.value,
  cart: copyObject(emptyCart),
  order: {
    name: '',
    street: '',
    city: '',
    zip: '',
    phone: '',
    comment: '',
    errors: {}
  },
  purchaseHistory: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PRODUCTS:
      return saveProducts(state, action.payload);

    case actionTypes.SAVE_CATEGORIES:
      return saveCategories(state, action.payload);

    case actionTypes.SET_FRAME:
      return setFrame(state, action.payload);

    case actionTypes.SET_CURRENCY:
      return setCurrency(state, action.payload);

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action.payload);

    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action.payload);

    case actionTypes.CLEAR_CART:
      return clearCart(state);

    case actionTypes.UPDATE_ORDER:
      return updateOrder(state, action.payload);

    case actionTypes.UPDATE_PURCHASE_HISTORY:
      return savePurchase(state, action.payload);

    default:
      return state;
  }
};

function saveProducts (state, products) {
  return {
    ...state,
    products
  }
}

function saveCategories (state, categories) {
  return {
    ...state,
    categories
  }
}

function setFrame (state, frame) {
  return {
    ...state,
    frame
  }
}

function setCurrency (state, currency) {
  return {
    ...state,
    currency
  }
}

function getTotalPrice ({ cart, products }) {
  return {
    [currencies.EUR.value]: calculatePrice(
      cart.items,
      products,
      cart.delivery[currencies.EUR.value],
      currencies.EUR.value),
    [currencies.USD.value]: calculatePrice(
      cart.items,
      products,
      cart.delivery[currencies.USD.value],
      currencies.USD.value)
  };
}

function addToCart (state, productId) {
  const cart = Object.assign({}, state.cart);
  const { items } = cart;

  typeof items[productId] === 'number'
    ? items[productId] += 1
    : items[productId] = 1;
  const totalPrice = getTotalPrice(state);

  return {
    ...state,
    cart: {
      ...state.cart,
      items,
      totalPrice
    }
  };
}

function removeFromCart (state, productId) {
  const cart = Object.assign({}, state.cart);
  const { items } = cart;

  if (typeof items[productId] === 'number') {
    items[productId] > 1
      ? items[productId] -= 1
      : delete items[productId];
  }
  const totalPrice = getTotalPrice(state);

  return {
    ...state,
    cart: {
      ...state.cart,
      items,
      totalPrice
    }
  };
}

function clearCart (state) {
  return {
    ...state,
    cart: copyObject(emptyCart)
  };
}

function updateOrder (state, order) {
  return {
    ...state,
    order
  }
}

function savePurchase (state, purchase) {
  return {
    ...state,
    purchaseHistory: [
      ...state.purchaseHistory,
      purchase
    ]
  }
}

export default reducer;
