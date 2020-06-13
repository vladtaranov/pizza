import actionTypes from '../constants/actionTypes';
import currencies from '../constants/currencies';
import frames from '../constants/frames';

const initialState = {
  frame: frames.NONE,
  currency: currencies.EUR.value
};

const appearance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FRAME:
      return setFrame(state, action.payload);

    case actionTypes.SET_CURRENCY:
      return setCurrency(state, action.payload);

    default:
      return state;
  }
};

function setFrame (state, frame) {
  return {
    ...state,
    frame
  }
}

function setCurrency (state, currency) {
  return {
    ...state,
    currency
  }
}

export default appearance;
