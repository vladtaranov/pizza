import actionTypes from '../constants/actionTypes';
import currencies from '../constants/currencies';
import frames from '../constants/frames';

const initialState = {
  products: [],
  categories: [],
  frame: frames.NONE,
  currency: currencies.EUR.value,
  cart: {},
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

    case actionTypes.UPDATE_ORDER:
      return updateOrder(state, action.payload);

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

function addToCart (state, productId) {
  const cart = Object.assign({}, state.cart);

  typeof cart[productId] === 'number'
    ? cart[productId] += 1
    : cart[productId] = 1;

  return {
    ...state,
    cart
  }
}

function removeFromCart (state, productId) {
  const cart = Object.assign({}, state.cart);

  if (typeof cart[productId] === 'number') {
    cart[productId] > 1
      ? cart[productId] -= 1
      : delete cart[productId];
  }

  return {
    ...state,
    cart
  }
}

function updateOrder (state, order) {
  return {
    ...state,
    order
  }
}

export default reducer;
