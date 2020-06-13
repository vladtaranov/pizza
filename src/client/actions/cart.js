import actionTypes from '../constants/actionTypes';

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

const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  }
};

export default {
  addToCart,
  removeFromCart,
  clearCart
};
