import React from 'react';
import PropTypes from 'prop-types';

import frames from '../../constants/frames';
import './purchase-history.scss';

const PurchaseHistory = ({ products, currency, purchaseHistory, setFrame }) => {


  const onReturnClick = () => {
    setFrame(frames.NONE);
  };

  return 1;

  return (
    <div className="purchase-history">
      <h2 className="purchase-history__title">
        Ihre Bisherige Käufe
      </h2>

      <ul className="purchase-history__items">
        {
          purchaseHistory.map((purchase) => {
            const purchaseProducts = [];
            Object.entries(purchase.items)
              .map(([productId, count]) => {
                const product = products.find((item) => +productId === item.id);
                if (product) {
                  product.count = count;
                  purchaseProducts.push(product);
                }
              });

            const title = purchase.date.getHours();

            return (
              <li
                key={purchase.id}
                className="purchase-history__item">
                <h3 className="purchase-history__item-title">
                  {title}
                </h3>
                {
                  purchaseProducts.map((product) => {
                    <div className="purchase-history__item-info">


                    </div>
                  })
                }
              </li>
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
