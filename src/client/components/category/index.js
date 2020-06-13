import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import './category.scss';

const Category = ({ products, category, currency, addToCart }) => {
  return (
    <section className="category">
      <h2 className="category__title">
        {category.title}
      </h2>

      <div className="category__catalog">
        {
          products.map((product) => {
            return (
              <div key={product.id} className="category__product">
                <Product
                  product={product}
                  currency={currency}
                  addToCart={addToCart} />
              </div>
            );
          })
        }
      </div>
    </section>
  );
};

Category.propTypes = {
  products: PropTypes.array.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  currency: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default Category;
