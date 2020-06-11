import actionTypes from '../constants/actionTypes';

const saveProducts = (products) => {
  return {
    type: actionTypes.SAVE_PRODUCTS,
    payload: products
  }
};

export default {
  saveProducts
}
