import actionTypes from '../constants/actionTypes';
import currencies from '../constants/currencies';
import copyObject from '../utils/copyObject';

const emptyCart = {
  items: {},
  delivery: {
    [currencies.EUR.value]: 7.9,
    [currencies.USD.value]: 9.9
  }
};

const initialState = copyObject(emptyCart);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action.payload);

    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action.payload);

    case actionTypes.CLEAR_CART:
      return clearCart(state);

    default:
      return state;
  }
};

function addToCart (state, productId) {
  const cart = Object.assign({}, state);
  const { items } = cart;

  typeof items[productId] === 'number'
    ? items[productId] += 1
    : items[productId] = 1;

  return {
    ...state,
    items
  };
}

function removeFromCart (state, productId) {
  const cart = Object.assign({}, state);
  const { items } = cart;

  if (typeof items[productId] === 'number') {
    items[productId] > 1
      ? items[productId] -= 1
      : delete items[productId];
  }

  return {
    ...state,
    items
  };
}

function clearCart () {
  return copyObject(emptyCart);
}

export default cart;
