import actionTypes from '../constants/actionTypes';
import LocalStorage from '../services/localStorage';

const updatePurchaseHistory = (purchase) => {
  return {
    type: actionTypes.UPDATE_PURCHASE_HISTORY,
    payload: purchase
  }
};

const savePurchase = () => (dispatch, getState) => {
  const date = new Date();
  const id = `${date.getFullYear()}-
    ${date.getMonth()}-
    ${date.getDate()}-
    ${date.getHours()}-
    ${date.getMinutes()}-
    ${date.getSeconds()}`.replace(/\s+/g, '');
  const purchase = {
    id,
    items: getState().cart.items,
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
  savePurchase,
  fetchPurchases
};
