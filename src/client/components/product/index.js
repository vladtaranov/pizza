import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import './product.scss';

const Product = (props) => {
  const { product, currency: currentCurrency, addToCart } = props;

  const image = require(`../../assets/images/catalog/${product.id}-min.jpg`);
  const price = formatPrice(product.price[currentCurrency]);
  const currency = currencies[currentCurrency].title;

  const onAddedCLick = () => {
    addToCart(product.id);
    showMessage();
  };

  const showMessage = () => {
    if (document.body.clientWidth > 900) {
      const rightMargin = document.body.clientWidth -
        document.querySelector('.js__header-cart').getBoundingClientRect().right;
      document.querySelector('.js__messages')
        .style.right = `${rightMargin}px`;
    }

    const message = document.createElement('li');
    message.classList.add('messages__item');
    message.innerHTML = `${product.title} hinzugefügt`;
    document.querySelector('.js__messages')
      .append(message);

    setInterval(() => {
      message.classList.add('is-disappearing');
    }, 1500);

    setInterval(() => {
      message.remove();
    }, 2000);
  };

  return (
    <Fragment>
      <section className="product">
        <img
          className="product__image"
          src={image}
          alt={product.title}
          onClick={onAddedCLick} />

        <div className="product__info">
          <div className="product__title-and-size">
            <h3 className="product__title">
              {product.title}
            </h3>

            <div className="product__size">
              {product.size}
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
              onClick={onAddedCLick}>
              In den Warenkorb
            </div>
          </div>
        </div>
      </section>
    </Fragment>
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
