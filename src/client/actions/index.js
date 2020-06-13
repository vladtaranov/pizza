import fetching from './fetching';
import appearance from './appearance';
import cart from './cart';
import order from './order';
import purchaseHistory from './purchaseHistory';

export default {
  // Fetching
  fetchProducts: fetching.fetchProducts,

  // Interface
  setFrame: appearance.setFrame,
  setCurrency: appearance.setCurrency,

  // Cart
  addToCartL: cart.addToCart,
  removeFromCart: cart.removeFromCart,
  clearCart: cart.clearCart,

  // Order
  updateOrder: order.updateOrder,

  // Purchase History
  savePurchase: purchaseHistory.savePurchase,
  fetchPurchases: purchaseHistory.fetchPurchases
}
