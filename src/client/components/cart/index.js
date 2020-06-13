import React from 'react';
import PropTypes from 'prop-types';
import currencies from '../../constants/currencies';
import frames from '../../constants/frames';
import { formatPrice } from '../../utils/formatters';
import EmptyCart from '../cart.empty';
import CartItem from '../cart.item';
import './cart.scss';

const Cart = ({ products, cart, currentCurrency, setFrame, addToCart, removeFromCart }) => {
  if (Object.keys(cart.items).length === 0) {
    return <EmptyCart
      onReturnClick={onReturnClick} />;
  }

  const productsInCart = [];
  Object.entries(cart.items)
    .map(([productId, count]) => {
      const product = products.find((item) => +productId === item.id);
      if (product) {
        product.count = count;
        productsInCart.push(product);
      }
    });

  const deliveryPrice = formatPrice(cart.delivery[currentCurrency]);
  const totalPrice = formatPrice(
    productsInCart.reduce((sum, product) =>
      sum + product.price[currentCurrency] * product.count, 0));
  const currency = currencies[currentCurrency].title;

  function onReturnClick () {
    setFrame(frames.NONE);
  }

  function onOrderClick () {
    setFrame(frames.ORDER);
  }

  return (
    <div className="cart">
      <h2 className="cart__title">
        Ihr Warenkorb
      </h2>

      <ul className="cart__items">
        {
          productsInCart.map((product) => {
            return <CartItem
              key={product.id}
              product={product}
              currentCurrency={currentCurrency}
              addToCart={addToCart}
              removeFromCart={removeFromCart} />
          })
        }
      </ul>

      <div className="cart__delivery">
        <div className="cart__delivery-caption">
          Versandkosten
        </div>
        <div className="cart__delivery-price">
          {`${deliveryPrice} ${currency}`}
        </div>
      </div>

      <div className="cart__total">
        <div className="cart__total-caption">
          Gesamtsumme
        </div>
        <div className="cart__total-price">
          {`${totalPrice} ${currency}`}
        </div>
      </div>

      <div className="cart__buttons">
        <div
          className="cart__return"
          onClick={onReturnClick}>
          Zurück shoppen
        </div>

        <div
          className="cart__order"
          onClick={onOrderClick}>
          Weiter
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.object.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  setFrame: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default Cart;
