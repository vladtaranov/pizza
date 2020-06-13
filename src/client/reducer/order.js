import actionTypes from '../constants/actionTypes';

const initialState = {
  name: '',
  street: '',
  city: '',
  zip: '',
  phone: '',
  comment: '',
  errors: {}
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ORDER:
      return updateOrder(state, action.payload);

    default:
      return state;
  }
};

function updateOrder (state, order) {
  return order;
}

export default order;
