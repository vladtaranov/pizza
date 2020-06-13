import actionTypes from '../constants/actionTypes';

const updateOrder = (order) => {
  return {
    type: actionTypes.UPDATE_ORDER,
    payload: order
  }
};

export default {
  updateOrder
};
