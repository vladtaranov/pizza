import React from 'react';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';
import isEqual from 'lodash.isequal';

import frames from '../../constants/frames';
import validateOrder from '../../services/validateOrder';
import Input from '../input';
import TextArea from '../textarea';
import './order.scss';

class Order extends React.Component {
  constructor (props) {
    super(props);

    const { order } = this.props;
    this.state = {
      areErrorsVisible: !isEqual({}, order.errors)
    };
  }

  componentDidMount () {
    this.validateData();
  }

  @boundMethod
  onReturnClick () {
    const { setFrame } = this.props;
    setFrame(frames.CART);
  };

  @boundMethod
  onOrderClick () {
    const { areErrorsVisible } = this.state;
    const { order, setFrame } = this.props;

    if (isEqual({}, order.errors)) {
      if (areErrorsVisible) {
        this.setState({
          areErrorsVisible: false
        });
      }
      setFrame(frames.ORDER_SUCCESS);
      return;
    }

    this.setState({
      areErrorsVisible: true
    });
  }

  @boundMethod
  onOrderChange () {
    this.validateData();
  };

  @boundMethod
  validateData () {
    const { updateOrder } = this.props;
    const form = document.forms.order;

    const validatedData = validateOrder({
      name: form.name.value,
      street: form.street.value,
      city: form.city.value,
      zip: form.zip.value,
      phone: form.phone.value,
      comment: form.comment.value
    });

    updateOrder(validatedData);
  }

  render () {
    const { areErrorsVisible } = this.state;
    const { order } = this.props;

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
            hasError={areErrorsVisible && order.errors.name}
            onChange={this.onOrderChange} />

          <Input
            style='order__street'
            name='street'
            title='Straße'
            value={order.street}
            placeholder='Straße'
            caption='Pflichtfeld'
            hasError={areErrorsVisible && order.errors.street}
            onChange={this.onOrderChange} />

          <div className="order__city-and-zip">
            <Input
              style='order__city'
              name='city'
              title='Ort'
              value={order.city}
              placeholder='Ort'
              onChange={this.onOrderChange} />

            <Input
              style='order__zip'
              name='zip'
              title='PZL'
              value={order.zip}
              placeholder='PZL'
              inputMode='numeric'
              onChange={this.onOrderChange} />
          </div>

          <Input
            style='order__phone'
            name='phone'
            title='Telefon'
            value={order.phone}
            placeholder='Telefon'
            caption='Pflichtfeld'
            inputMode='tel'
            hasError={areErrorsVisible && order.errors.phone}
            onChange={this.onOrderChange} />

          <TextArea
            style='order__comment'
            name='comment'
            title='Hinweise'
            value={order.comment}
            placeholder='Anmerkungen zur Ihre Bestellung'
            rows={4}
            onChange={this.onOrderChange} />
        </div>

        <div className="order__buttons">
          <div
            className="order__return"
            onClick={this.onReturnClick}>
            Zum Warenkorb
          </div>

          <div
            className="order__order"
            onClick={this.onOrderClick}>
            Bestellen
          </div>
        </div>
      </form>
    );
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  updateOrder: PropTypes.func.isRequired,
  setFrame: PropTypes.func.isRequired
};

export default Order;
