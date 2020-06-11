import actionTypes from '../constants/actionTypes';

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PRODUCTS:
      return saveProducts(state, action.payload);

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

export default reducer;
