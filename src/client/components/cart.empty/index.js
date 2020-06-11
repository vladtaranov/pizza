import React from 'react';
import PropTypes from 'prop-types';
import './empty-cart.scss';

const EmptyCart = ({ onReturnClick }) => {
  return (
    <div className="empty-cart">
      <h2 className="empty-cart__title">
        Ihr Warenkorb ist leer
      </h2>

      <div
        className="empty-cart__return"
        onClick={onReturnClick}>
        Zurück shoppen
      </div>
    </div>
  );
};

EmptyCart.propTypes = {
  onReturnClick: PropTypes.func.isRequired
};

export default EmptyCart;
