import actionTypes from '../constants/actionTypes';

const setFrame = (frame) => {
  return {
    type: actionTypes.SET_FRAME,
    payload: frame
  }
};

const setCurrency = (currency) => {
  return {
    type: actionTypes.SET_CURRENCY,
    payload: currency
  }
};

export default {
  setFrame,
  setCurrency
};
