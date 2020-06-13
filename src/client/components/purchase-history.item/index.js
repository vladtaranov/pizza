import React from 'react';
import PropTypes from 'prop-types';
import currencies from '../../constants/currencies';
import { formatPrice } from '../../utils/formatters';
import getMonthTitle from '../../utils/getMonthTitle';
import getDayOfWeekTitle from '../../utils/getDayOfWeekTitle';
import './purchase-history.item.scss';

const Purchase = ({ purchaseIdx, purchase, products, currentCurrency }) => {
  const purchaseProducts = [];
  Object.entries(purchase.items)
    .map(([productId, count]) => {
      const product = products.find((item) => +productId === item.id);
      if (product) {
        product.count = count;
        purchaseProducts.push(product);
      }
    });
  const title = `${purchaseIdx}. Bestellung`;
  const date = new Date(purchase.date);
  const dateTitle =
    `${getDayOfWeekTitle(date.getDay())},
     ${date.getDate()}.
     ${getMonthTitle(date.getMonth() + 1)},
     ${date.getFullYear()}.
     ${date.getHours()}:${date.getMinutes()}`;
  const totalPrice = formatPrice(purchase.totalPrice[currentCurrency]);
  const currency = currencies[currentCurrency].title;

  return (
    <li className="purchase">
      <h3 className="purchase__title">
        {title}
      </h3>

      {
        purchaseProducts.map((product) => {
          const size = `${product.size} cm`;
          const price = formatPrice(product.price[currentCurrency] * product.count);

          return (
            <div
              key={product.id}
              className="purchase__info">
              <div className="purchase__subtitle-and-size">
                <div className="purchase__subtitle">
                  {product.title}
                </div>
                <div className="purchase__size">
                  {size}
                </div>
              </div>

              <div className="purchase__count">
                {`x${product.count}`}
              </div>

              <div className="purchase__price">
                {`${price} ${currency}`}
              </div>
            </div>
          );
        })
      }

      <div className="purchase__date-and-total-price">
        <div className="purchase__date">
          {dateTitle}
        </div>

        <div className="purchase__total-price">
          {`Gesamtsumme: ${totalPrice} ${currency}`}
        </div>
      </div>
    </li>
  );
};

Purchase.propTypes = {
  purchaseIdx: PropTypes.number.isRequired,
  purchase: PropTypes.shape({
    items: PropTypes.object.isRequired,
    totalPrice: PropTypes.shape({
      EUR: PropTypes.number.isRequired,
      USD: PropTypes.number.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  products: PropTypes.array.isRequired,
  currentCurrency: PropTypes.string.isRequired
};

export default Purchase;
