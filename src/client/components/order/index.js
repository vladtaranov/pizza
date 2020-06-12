import React from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import Input from '../input';
import TextArea from '../textarea';
import './order.scss';

const Order = ({ setFrame }) => {
  const onReturnClick = () => {
    setFrame(frames.CART);
  };

  const onOrderClick = () => {
    setFrame(frames.ORDER_SUCCESS);
  };

  const validateData = () => {

  };

  return (
    <form className="order" name="order">
      <h2 className="order__title">
        Lieferungsdetails
      </h2>

      <div className="order__details">
        <Input
          style='order__name'
          name='name'
          title='Name'
          placeholder='Name'
          caption='Pflichtfeld' />

        <div className="order__street-and-zip">
          <Input
            style='order__street'
            name='street'
            title='Straße'
            placeholder='Straße'
            caption='Pflichtfeld' />

          <Input
            style='order__zip'
            name='zip'
            title='Postleitzahl'
            placeholder='Postleitzahl'
            caption='Pflichtfeld'
            inputMode='numeric' />
        </div>

        <Input
          style='order__phone'
          name='phone'
          title='Telefon'
          placeholder='Telefon'
          caption='Pflichtfeld'
          inputMode='tel' />

        <TextArea
          style='order__comment'
          name='comment'
          title='Hinweise'
          placeholder='Anmerkungen zur Ihre Bestellung'
          rows={4} />
      </div>

      <div className="order__buttons">
        <div
          className="order__return"
          onClick={onReturnClick}>
          Zum Warenkorb
        </div>

        <input
          type="submit"
          className="order__order"
          onClick={onOrderClick}
          value="Bestellen" />
      </div>
    </form>
  );
};

Order.propTypes = {
  setFrame: PropTypes.func.isRequired
};

export default Order;
