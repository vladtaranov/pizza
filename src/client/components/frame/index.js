import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import Cart from '../cart';
import Order from '../order';
import cn from 'classnames';
import './frame.scss';

const Frame = (props) => {
  const {
    products,
    currentFrame,
    cart,
    order,
    currency,
    setFrame,
    addToCart,
    removeFromCart,
    updateOrder
  } = props;

  const frameStyle = cn(
    'frame',
    { 'is-visible': currentFrame !== frames.NONE }
  );

  const onCloseClick = ({ target }) => {
    if (!target.closest('.frame__content')) {
      setFrame(frames.NONE);
    }
  };

  const renderContent = () => {
    switch (currentFrame) {
      case frames.CART:
        return <Cart
          products={products}
          cart={cart}
          currentCurrency={currency}
          setFrame={setFrame}
          addToCart={addToCart}
          removeFromCart={removeFromCart} />;

      case frames.ORDER:
        return <Order
          order={order}
          updateOrder={updateOrder}
          setFrame={setFrame} />;

      default:
        return <Fragment />;
    }
  };

  return (
    <section
      className={frameStyle}
      onMouseDown={onCloseClick}>
      <div className="frame__content">
        {
          renderContent()
        }
      </div>
    </section>
  );
};

Frame.propTypes = {
  products: PropTypes.array.isRequired,
  currentFrame: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  setFrame: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired
};

export default Frame;
