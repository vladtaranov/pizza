import React from 'react';
import PropTypes from 'prop-types';
import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import './cart-item.scss';

const CartItem = ({ product, currentCurrency, addToCart, removeFromCart }) => {
  const image = require(`../../assets/images/catalog/${product.id}-min.jpg`);
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
      <img
        className="cart-item__image"
        src={image}
        alt={product.title}/>

      <div className="cart-item__info">
        <div className="cart-item__title-and-size">
          <h3 className="cart-item__title">
            {product.title}
          </h3>
          <div className="cart-item__size">
            {product.size}
          </div>
        </div>
        <p className="cart-item__description">
          {product.description}
        </p>
      </div>

      <div className="cart-item__count-container">
        <div className="cart-item__dec" onClick={onDecClick}>
          -
        </div>
        <div className="cart-item__count">
          {product.count}
        </div>
        <div className="cart-item__inc" onClick={onIncClick}>
          +
        </div>
      </div>

      <div className="cart-item__price">
        {`${price} ${currency}`}
      </div>
    </li>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    size: PropTypes.string.isRequired,
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

export default CartItem;
