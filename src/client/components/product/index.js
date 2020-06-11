import React from 'react';
import PropTypes from 'prop-types';

import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import './product.scss';

const Product = (props) => {
  const { product, currency: currentCurrency, addToCart } = props;

  const image = require(`../../assets/images/catalog/${product.id}-min.jpg`);
  const size = `${product.size} cm`;
  const price = formatPrice(product.price[currentCurrency]);
  const currency = currencies[currentCurrency].title;

  const onImageClick = () => {
    addToCart(product.id);
  };
  const onButtonClick = () => {
    addToCart(product.id);
  };

  return (
    <section className="product">
      <img
        className="product__image"
        src={image}
        alt={product.title}
        onClick={onImageClick} />

      <div className="product__title-and-size">
        <h3 className="product__title">
          {product.title}
        </h3>

        <div className="product__size">
          {size}
        </div>
      </div>

      {
        product.description &&
        <p className="product__description">
          {product.description}
        </p>
      }

      <div className="product__price-and-button">
        <div className="product__price">
          {`${price} ${currency}`}
        </div>

        <div
          className="product__button"
          onClick={onButtonClick}>
          In den Warenkorb
        </div>
      </div>
    </section>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    size: PropTypes.number.isRequired,
    price: PropTypes.shape({
      EUR: PropTypes.number.isRequired,
      USD: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  currency: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default Product;
