import React from 'react';
import PropTypes from 'prop-types';
import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import './cart-item.scss';

const PurchaseHistoryItem = ({ product, currentCurrency, addToCart, removeFromCart }) => {
  const image = require(`../../assets/images/catalog/${product.id}-min.jpg`);
  const size = `${product.size} cm`;
  const price = formatPrice(product.price[currentCurrency] * product.count);
  const currency = currencies[currentCurrency].title;

  const onDecClick = () => {
    removeFromCart(product.id);
  };
  const onIncClick = () => {
    addToCart(product.id);
  };

  return (
    <li className="cart-item">

    </li>
  );
};

PurchaseHistoryItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    size: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.shape({
      EUR: PropTypes.number.isRequired,
      USD: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  currentCurrency: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default PurchaseHistoryItem;
