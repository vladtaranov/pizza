import React from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import './order-success.scss';

const OrderSuccess = ({ setFrame }) => {
  const onReturnClick = () => {
    setFrame(frames.NONE);
  };

  return (
    <div className="order-success">
      <div className="order-success__icon">
        favorite_border
      </div>

      <h2 className="order-success__title">
        Vielen Dank für Ihre Bestellung!
      </h2>

      <div
        className="order-success__return"
        onClick={onReturnClick}>
        OK
      </div>
    </div>
  );
};

OrderSuccess.propTypes = {
  setFrame: PropTypes.func.isRequired
};

export default OrderSuccess;
