import { combineReducers } from 'redux';
import catalog from './catalog';
import appearance from './appearance';
import cart from './cart';
import order from './order';
import purchaseHistory from './purchaseHistory';

export default combineReducers({
  catalog,
  appearance,
  cart,
  order,
  purchaseHistory
});
