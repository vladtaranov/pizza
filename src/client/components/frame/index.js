import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import frames from '../../constants/frames';
import Cart from '../cart';
import Order from '../order';
import OrderSuccess from '../order.success';
import PurchaseHistory from '../purchase-history';
import cn from 'classnames';
import './frame.scss';

const Frame = (props) => {
  const {
    products,
    currentFrame,
    cart,
    order,
    currency,
    purchaseHistory,
    setFrame,
    addToCart,
    removeFromCart,
    clearCart,
    updateOrder,
    savePurchase
  } = props;
  currentFrame === frames.NONE
    ? document.body.classList.remove('is-blocked')
    : document.body.classList.add('is-blocked');

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
          setFrame={setFrame}
          clearCart={clearCart}
          savePurchase={savePurchase} />;

      case frames.ORDER_SUCCESS:
        return <OrderSuccess
          setFrame={setFrame} />;

      case frames.PURCHASE_HISTORY:
        return <PurchaseHistory
          products={products}
          currency={currency}
          purchaseHistory={purchaseHistory}
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
  purchaseHistory: PropTypes.array.isRequired,
  setFrame: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  savePurchase: PropTypes.func.isRequired
};

export default Frame;
