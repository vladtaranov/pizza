import actionTypes from '../constants/actionTypes';

const initialState = {
  products: [],
  categories: []
};

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PRODUCTS:
      return saveProducts(state, action.payload);

    case actionTypes.SAVE_CATEGORIES:
      return saveCategories(state, action.payload);

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

export default catalog;
