import React from 'react';
import PropTypes from 'prop-types';

import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import './product.scss';

class Product extends React.Component {
  render () {
    const { product, currency: currentCurrency } = this.props;

    const price = formatPrice(product.price[currentCurrency]);
    const currency = currencies[currentCurrency].title;

    return (
      <section className="product">
        <h3 className="product__title">
          {product.title}
        </h3>

        <div className="product__price">
          {`${price} ${currency}`}
        </div>
      </section>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.shape({
      EUR: PropTypes.number.isRequired,
      USD: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  currency: PropTypes.string.isRequired
};

export default Product;
