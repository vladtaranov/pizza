import React from 'react';
import PropTypes from 'prop-types';
import frames from '../../constants/frames';
import Input from '../input';
import TextArea from '../textarea';
import './order.scss';

const Order = ({ order, updateOrder, setFrame }) => {
  const onReturnClick = () => {
    setFrame(frames.CART);
  };

  const onOrderClick = () => {
    setFrame(frames.ORDER_SUCCESS);
  };

  const validateData = () => {

  };

  const onChange = () => {
    console.log('12')
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
          value={order.name}
          placeholder='Name'
          caption='Pflichtfeld'
          onChange={onChange} />

        <div className="order__street-and-zip">
          <Input
            style='order__street'
            name='street'
            title='Straße'
            value={order.street}
            placeholder='Straße'
            caption='Pflichtfeld'
            onChange={onChange} />

          <Input
            style='order__zip'
            name='zip'
            title='Postleitzahl'
            value={order.zip}
            placeholder='Postleitzahl'
            caption='Pflichtfeld'
            inputMode='numeric'
            onChange={onChange} />
        </div>

        <Input
          style='order__phone'
          name='phone'
          title='Telefon'
          value={order.phone}
          placeholder='Telefon'
          caption='Pflichtfeld'
          inputMode='tel'
          onChange={onChange} />

        <TextArea
          style='order__comment'
          name='comment'
          title='Hinweise'
          value={order.comment}
          placeholder='Anmerkungen zur Ihre Bestellung'
          rows={4}
          onChange={onChange} />
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
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
  }).isRequired,
  updateOrder: PropTypes.func.isRequired,
  setFrame: PropTypes.func.isRequired
};

export default Order;
