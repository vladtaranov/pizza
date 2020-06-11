import actionTypes from '../constants/actionTypes';

const saveProducts = (products) => {
  return {
    type: actionTypes.SAVE_PRODUCTS,
    payload: products
  }
};

const setFrame = (frame) => {
  return {
    type: actionTypes.SET_FRAME,
    payload: frame
  }
};

const setCurrency = (currency) => {
  return {
    type: actionTypes.SET_CURRENCY,
    payload: currency
  }
};

const addToCart = (productId) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: productId
  }
};

const removeFromCart = (productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: productId
  }
};

export default {
  saveProducts,
  setFrame,
  setCurrency,
  addToCart,
  removeFromCart
}
