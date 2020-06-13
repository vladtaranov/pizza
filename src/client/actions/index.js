import actionTypes from '../constants/actionTypes';
import Server from '../services/server';
import LocalStorage from '../services/localStorage';

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

const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  }
};

const updateOrder = (order) => {
  return {
    type: actionTypes.UPDATE_ORDER,
    payload: order
  }
};

const updatePurchaseHistory = (purchase) => {
  return {
    type: actionTypes.UPDATE_PURCHASE_HISTORY,
    payload: purchase
  }
};

const savePurchase = () => (dispatch, getState) => {
  const date = new Date();
  const id = `${date.getFullYear()}-
    ${date.getMonth() + 1}-
    ${date.getDate()}-
    ${date.getHours()}-
    ${date.getMinutes()}-
    ${date.getSeconds()}`.replace(/\s+/g, '');
  const purchase = {
    id,
    items: getState().cart.items,
    totalPrice: getState().cart.totalPrice,
    date
  };

  try {
    let purchases = LocalStorage.load('purchaseHistory');
    if (purchases) {
      if (!purchases.find((item) => item.id === purchase.id)) {
        purchases.push(purchase);
      }
    } else {
      purchases = [purchase];
    }
    LocalStorage.save('purchaseHistory', purchases);
  } catch (error) {
    console.log(error);
  }

  dispatch(updatePurchaseHistory(purchase));
};

const fetchPurchases = () => (dispatch) => {
  try {
    const purchases = LocalStorage.load('purchaseHistory');
    if (purchases) {
      purchases.forEach((purchase) => {
        dispatch(updatePurchaseHistory(purchase));
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  // Fetching
  fetchProducts,

  // Interface
  setFrame,
  setCurrency,

  // Cart
  addToCart,
  removeFromCart,
  clearCart,

  // Order
  updateOrder,

  // Purchase History
  savePurchase,
  fetchPurchases
}
