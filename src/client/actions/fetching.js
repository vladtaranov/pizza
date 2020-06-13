import actionTypes from '../constants/actionTypes';
import Server from '../services/server';

const saveProducts = (products) => {
  return {
    type: actionTypes.SAVE_PRODUCTS,
    payload: products
  }
};

const saveCategories = (categories) => {
  return {
    type: actionTypes.SAVE_CATEGORIES,
    payload: categories
  }
};

const fetchProducts = () => async (dispatch) => {
  try {
    const server = new Server();
    const [
      products,
      categories
    ] = await Promise.all([
      server.getAllProducts(),
      server.getAllCategories()
    ]);

    dispatch(saveProducts(products));
    dispatch(saveCategories(categories));
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  fetchProducts
};
