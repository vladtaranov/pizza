export default (cartItems, products, deliveryCost, currency) => {
  let productsCost = 0;

  Object.entries(cartItems).map(([productId, count]) => {
    const product = products.find((product) => product.id === +productId);
    productsCost += product.price[currency] * count;
  });

  return productsCost + deliveryCost;
};
