import React from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import './purchase-history.empty.scss';

const EmptyPurchaseHistory = ({ setFrame }) => {
  const onReturnClick = () => {
    setFrame(frames.NONE);
  };

  return (
    <div className="empty-purchase-history">
      <h2 className="empty-purchase-history__title">
        Sie haben noch nichts gekauft
      </h2>

      <div
        className="empty-purchase-history__return"
        onClick={onReturnClick}>
        Zurück shoppen
      </div>
    </div>
  );
};

EmptyPurchaseHistory.propTypes = {
  setFrame: PropTypes.func.isRequired
};

export default EmptyPurchaseHistory;
