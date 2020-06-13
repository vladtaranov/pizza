import React from 'react';
import PropTypes from 'prop-types';

import './purchase-history.scss';

const PurchaseHistory = ({ products, currency, purchaseHistory, setFrame }) => {
  console.log(purchaseHistory);

  return (
    123
  );
};

PurchaseHistory.propTypes = {
  products: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  purchaseHistory: PropTypes.array.isRequired,
  setFrame: PropTypes.func.isRequired
};

export default PurchaseHistory;
