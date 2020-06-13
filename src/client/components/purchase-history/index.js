import React from 'react';
import PropTypes from 'prop-types';

import frames from '../../constants/frames';
import Purchase from '../purchase-history.item';
import EmptyPurchaseHistory from '../purchase-history.empty';
import './purchase-history.scss';

const PurchaseHistory = ({ products, currency, purchaseHistory, setFrame }) => {
  if (purchaseHistory.length === 0) {
    return (
      <EmptyPurchaseHistory
        setFrame={setFrame} />
    );
  }

  const onReturnClick = () => {
    setFrame(frames.NONE);
  };

  return (
    <div className="purchase-history">
      <h2 className="purchase-history__title">
        Ihre Bisherige Käufe
      </h2>

      <ul className="purchase-history__items">
        {
          purchaseHistory.map((purchase, idx) => {
            return (
              <Purchase
                key={purchase.id}
                purchaseIdx={idx + 1}
                purchase={purchase}
                products={products}
                currentCurrency={currency} />
            );
          })
        }
      </ul>

      <div
        className="purchase-history__return"
        onClick={onReturnClick}>
        Zurück shoppen
      </div>
    </div>
  );
};

PurchaseHistory.propTypes = {
  products: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  purchaseHistory: PropTypes.array.isRequired,
  setFrame: PropTypes.func.isRequired
};

export default PurchaseHistory;
