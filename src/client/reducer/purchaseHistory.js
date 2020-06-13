import actionTypes from '../constants/actionTypes';

const initialState = [];

const purchaseHistory = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PURCHASE_HISTORY:
      return savePurchase(state, action.payload);

    default:
      return state;
  }
};

function savePurchase (state, purchase) {
  return [
    ...state,
    purchase
  ]
}

export default purchaseHistory;
