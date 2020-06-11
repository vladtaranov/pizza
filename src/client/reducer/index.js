import actionTypes from '../constants/actionTypes';
import currencies from '../constants/currencies';

const initialState = {
  products: [],
  currency: currencies.EUR.value
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PRODUCTS:
      return saveProducts(state, action.payload);

    case actionTypes.SET_CURRENCY:
      return setCurrency(state, action.payload);

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

function setCurrency (state, currency) {
  return {
    ...state,
    currency
  }
}

export default reducer;
